package com.organica.services.impl;

import com.organica.entities.Constants;
import com.organica.entities.Product;
import com.organica.payload.ProductDto;
import com.organica.repositories.ProductRepo;
import com.organica.response.ProductResponseForFilter;
import com.organica.services.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Locale.Category;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepo productRepo;

    // Create
    @Override
    public ProductDto CreateProduct(ProductDto productDto) {
        Product product = this.modelMapper.map(productDto, Product.class);
        product.setImg(compressBytes(product.getImg()));
        if (productDto.getCategory() != null && !productDto.getCategory().isEmpty()) {
            String category = productDto.getCategory().toUpperCase();
            if (Constants.CATEGORIES.contains(category))
                product.setCategory(productDto.getCategory().toUpperCase());
        } else {
            throw new IllegalArgumentException("Invalid category provided");
        }

        Product save = this.productRepo.save(product);
        save.setImg(null);
        return this.modelMapper.map(save, ProductDto.class);
    }

    // Read One
    @Override
    public ProductDto ReadProduct(Integer ProductId) {

        Product save = this.productRepo.findById(ProductId).orElseThrow();
        save.setImg(decompressBytes(save.getImg()));

        return this.modelMapper.map(save, ProductDto.class);
    }

    // Read All
    @Override
    public List<ProductDto> ReadAllProduct() {
        List<Product> all = this.productRepo.findAll();

        List<ProductDto> collect = all.stream().map(dto -> new ProductDto(dto.getProductId(), dto.getProductName(),
                dto.getDescription(), dto.getPrice(), dto.getWeight(), decompressBytes(dto.getImg()),
                dto.getCategory()))
                .collect(Collectors.toList());

        return collect;
    }

    // Delete
    @Override
    public void DeleteProduct(Integer productId) {

        // Product product = this.productRepo.findById(productId).orElseThrow();
        this.productRepo.deleteById(productId);
        return;

    }

    // Update
    @Override
    public String UpdateProduct(ProductDto productDto, Integer ProductId) {

        Product newProduct = this.productRepo.findById(ProductId).orElseThrow();
        newProduct.setProductId(ProductId);
        newProduct.setDescription(productDto.getDescription());
        newProduct.setProductName(productDto.getProductName());
        newProduct.setWeight(Float.valueOf(productDto.getWeight()));
        newProduct.setPrice(Float.valueOf(productDto.getPrice()));
        newProduct.setImg(productDto.getImg());
        newProduct.setImg(compressBytes(productDto.getImg()));
        if (productDto.getCategory() != null && !productDto.getCategory().isEmpty()) {
            String category = productDto.getCategory().toUpperCase();
            if (Constants.CATEGORIES.contains(category))
                newProduct.setCategory(productDto.getCategory().toUpperCase());
            else
                throw new IllegalArgumentException("Invalid category provided");
        }

        productRepo.save(newProduct);

        return "Updated Successfully..!";
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
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

    @Override
    public List<ProductDto> getByProductByCategory(String category) {
        if (category == null || category.isEmpty()) {
            return List.of();
        } else {
            if (category.equals("ALL")) {
                List<ProductResponseForFilter> allProducts = this.productRepo.findByCategorieList(Constants.CATEGORIES);
                allProducts.forEach(product -> {
                    product.setImg(decompressBytes(product.getImg()));
                });
                return allProducts.stream()
                        .map(product -> this.modelMapper.map(product, ProductDto.class))
                        .collect(Collectors.toList());
            }
            List<ProductResponseForFilter> products = this.productRepo.findByCategory(category);
            products.forEach(p -> {
                p.setImg(decompressBytes(p.getImg()));
            });
            return products.stream()
                    .map(product -> this.modelMapper.map(product, ProductDto.class))
                    .collect(Collectors.toList());
        }
    }

    @Override
    public List<ProductResponseForFilter> getProductsByFilter(String category, Integer fromPrice, Integer toPrice,
            String search) {
        List<ProductResponseForFilter> products = new ArrayList<>();
        if (category != null && !category.isEmpty()) {
            if (category.equals("ALL")) {
                List<ProductResponseForFilter> allProducts = this.productRepo.findByCategorieList(Constants.CATEGORIES);
                allProducts.forEach(product -> {
                    product.setImg(decompressBytes(product.getImg()));
                    products.add(product);
                });
                // return products;
            } else {
                List<ProductResponseForFilter> productsByCatergory = this.productRepo.findByCategory(category);
                productsByCatergory.forEach(product -> {
                    product.setImg(decompressBytes(product.getImg()));
                    products.add(product);
                });
            }
        } else if (fromPrice != null && toPrice != null) {
            List<ProductResponseForFilter> productsByRange = this.productRepo.findByPriceRange(Float.valueOf(fromPrice),
                    Float.valueOf(toPrice));
            productsByRange.forEach(product -> {
                product.setImg(decompressBytes(product.getImg()));
                products.add(product);
            });
        } else if (search != null && !search.isEmpty()) {
            List<ProductResponseForFilter> productsBy = this.productRepo.findByProductBySearch(search);
            productsBy.forEach(product -> {
                product.setImg(decompressBytes(product.getImg()));
                products.add(product);
            });
        }

        return products;
    }

    @Override
    public List<String> getAllCategories() {
        return Constants.CATEGORIES;
    }

}
