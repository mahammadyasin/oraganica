package com.organica.controllers;

import com.organica.payload.ApiResponse;
import com.organica.payload.ProductDto;
import com.organica.response.ProductResponseForFilter;
import com.organica.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductControllers {

    @Autowired
    private ProductService productService;

    // Create Product
    @PostMapping(value = "/add")
    public ResponseEntity<ProductDto> CreateProduct(@RequestParam MultiValueMap<String, String> formData,
            @RequestParam("img") MultipartFile file) throws IOException {
        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("productname"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setWeight(Float.valueOf(formData.getFirst("weight")));
        productDto.setPrice(Float.valueOf(formData.getFirst("price")));
        productDto.setImg(file.getBytes());
        productDto.setCategory(formData.getFirst("category"));

        ProductDto save = this.productService.CreateProduct(productDto);

        return new ResponseEntity<ProductDto>(save, HttpStatusCode.valueOf(200));
    }

    // Get by Id
    @GetMapping("/find{productid}")
    public ResponseEntity<ProductDto> GetById(@PathVariable Integer productid) {
        ProductDto product = this.productService.ReadProduct(productid);

        return new ResponseEntity<>(product, HttpStatusCode.valueOf(200));
    }

    // Get All Product
    @GetMapping("/findall")
    public ResponseEntity<List<ProductDto>> getAll() {
        List<ProductDto> products = this.productService.ReadAllProduct();

        return new ResponseEntity<>(products, HttpStatusCode.valueOf(200));
    }

    // Delete Product
    @DeleteMapping(value = "/del/{ProductId}", produces = "application/json")
    public ResponseEntity<ApiResponse> Delete(@PathVariable Integer ProductId) {
        this.productService.DeleteProduct(ProductId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Product deleted"), HttpStatusCode.valueOf(200));
    }

    // Update Product
    @PutMapping("/update{ProductId}")
    public ResponseEntity<String> UpdateProduct(@RequestParam MultiValueMap<String, String> formData,
            @RequestParam("img") MultipartFile file, @PathVariable Integer ProductId) throws IOException {
        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("productname"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setWeight(Float.valueOf(formData.getFirst("weight")));
        productDto.setPrice(Float.valueOf(formData.getFirst("price")));
        productDto.setImg(file.getBytes());
        productDto.setCategory(formData.getFirst("category"));

        String save = this.productService.UpdateProduct(productDto, ProductId);

        return new ResponseEntity<String>(save, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ProductResponseForFilter>> getProductsByFilter(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Integer fromPrice,
            @RequestParam(required = false) Integer toPrice,
            @RequestParam(required = false) String search) {
        return new ResponseEntity<List<ProductResponseForFilter>>(
                this.productService.getProductsByFilter(category, fromPrice, toPrice, search),
                HttpStatusCode.valueOf(200));
    }

    @GetMapping("/category")
    public ResponseEntity<List<ProductDto>> getByProductByCategory(@RequestParam String category) {
        List<ProductDto> products = this.productService.getByProductByCategory(category);
        return new ResponseEntity<>(products, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/category/dropdown")
    public ResponseEntity<List<String>> getAllCategories() {
        return new ResponseEntity<>(
                this.productService.getAllCategories(), HttpStatusCode.valueOf(200));
    }

}
