package com.organica.services.impl;

import com.organica.entities.Cart;
import com.organica.entities.CartDetalis;
import com.organica.entities.Product;
import com.organica.entities.User;
import com.organica.payload.*;
import com.organica.repositories.CartDetailsRepo;
import com.organica.repositories.CartRepo;
import com.organica.repositories.ProductRepo;
import com.organica.repositories.UserRepo;
import com.organica.response.CartDetailsResponseModel;
import com.organica.services.CartService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CartDetailsRepo cartDetailsRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CartDto CreateCart(CartHelp cartHelp) {
        return null;
    }

    @Override
    public CartDto addProductToCart(CartHelp cartHelp) {

        int productId = cartHelp.getProductId();
        int quantity = cartHelp.getQuantity();
        String userEmail = cartHelp.getUserEmail();
        AtomicReference<Integer> totalAmount = new AtomicReference<>(0);

        User user = this.userRepo.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = this.productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = user.getCart();

        CartDetalis cartDetalis = new CartDetalis();
        cartDetalis.setProducts(product);
        cartDetalis.setQuantity(quantity);
        cartDetalis.setAmount((int) (product.getPrice() * quantity));

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);

            cartDetalis.setCart(cart);
            List<CartDetalis> cartList = new ArrayList<>();
            cartList.add(cartDetalis);

            cart.setCartDetalis(cartList);
            cart.setTotalAmount(cartDetalis.getAmount());

            cart = cartRepo.save(cart);
            user.setCart(cart); // important to establish bidirectional link
            userRepo.save(user);

            return convertToDto(cart);
        }

        cartDetalis.setCart(cart);
        List<CartDetalis> cartDetailsList = cart.getCartDetalis();
        AtomicReference<Boolean> found = new AtomicReference<>(false);

        List<CartDetalis> updatedList = cartDetailsList.stream().map(i -> {
            if (i.getProducts().getProductId() == productId) {
                i.setQuantity(quantity);
                i.setAmount((int) (product.getPrice() * quantity));
                found.set(true);
            }
            totalAmount.set(totalAmount.get() + i.getAmount());
            return i;
        }).collect(Collectors.toList());

        if (!found.get()) {
            updatedList.add(cartDetalis);
            totalAmount.set(totalAmount.get() + cartDetalis.getAmount());
        }

        cart.setCartDetalis(updatedList);
        cart.setTotalAmount(totalAmount.get());
        Cart savedCart = this.cartRepo.save(cart);

        return convertToDto(savedCart);
    }

    public CartDto convertToDto(Cart cart) {
        CartDto dto = new CartDto();
        dto.setId(cart.getId());
        dto.setTotalAmount(cart.getTotalAmount());

        // Map User -> UserDto
        User user = cart.getUser();
        UserDto userDto = new UserDto();
        userDto.setUserid(user.getUserid().intValue());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        userDto.setContact(user.getContact());
        userDto.setDate(user.getDate());
        dto.setUser(userDto);

        // Map List<CartDetalis> -> List<CartDetailDto>
        List<CartDetailDto> detailDtos = new ArrayList<>();
        if (cart.getCartDetalis() != null) {
            for (CartDetalis detail : cart.getCartDetalis()) {
                CartDetailDto d = new CartDetailDto();
                d.setCartDetalisId(detail.getCartDetalisId());
                d.setQuantity(detail.getQuantity());
                d.setAmount(detail.getAmount());

                // Map Product -> ProductDto
                ProductDto p = new ProductDto();
                p.setProductid(detail.getProducts().getProductId());
                p.setProductName(detail.getProducts().getProductName());
                p.setDescription(detail.getProducts().getDescription());
                p.setPrice(detail.getProducts().getPrice());
                p.setWeight(detail.getProducts().getWeight());
                p.setCategory(detail.getProducts().getCategory());

                // Handle image bytes safely
                try {
                    p.setImg(decompressBytes(detail.getProducts().getImg()));
                } catch (Exception e) {
                    p.setImg(null); // or log if needed
                }

                d.setProducts(p);
                detailDtos.add(d);
            }
        }

        dto.setCartDetalis(detailDtos);
        return dto;
    }

    @Override
    public CartDto GetCart(String userEmail) {
        User user = this.userRepo.findByEmail(userEmail).get();
        Cart byUser = this.cartRepo.findByUser(user);

        // img decompressBytes
        CartDto map = convertToDto(byUser);
        List<CartDetailDto> cartDetalis1 = map.getCartDetalis();

        for (CartDetailDto i : cartDetalis1) {
            ProductDto p = i.getProducts();
            p.setImg(decompressBytes(p.getImg()));
        }
        map.setCartDetalis(cartDetalis1);
        return map;
    }

    @Override
    public void RemoveById(Integer ProductId, String userEmail) {
        User user = this.userRepo.findByEmail(userEmail).get();

        Product product = this.productRepo.findById(ProductId).orElseThrow();
        Cart cart = this.cartRepo.findByUser(user);

        CartDetalis byProductsAndCart = this.cartDetailsRepo.findByProductsAndCart(product, cart);
        int amount = byProductsAndCart.getAmount();
        cart.setTotalAmount(cart.getTotalAmount() - amount);
        this.cartRepo.save(cart);

        this.cartDetailsRepo.delete(byProductsAndCart);

    }

    public Product changeImg(Product product) {

        product.setImg(decompressBytes(product.getImg()));

        System.out.println("hello");
        return product;
    }

    public int totalP(int t1, int total) {
        return total + t1;
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
