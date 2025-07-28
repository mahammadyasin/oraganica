package com.organica.services;

import com.organica.payload.ProductDto;
import com.organica.response.ProductResponseForFilter;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

public interface ProductService {

    // create
    ProductDto CreateProduct(ProductDto productDto);

    // read
    ProductDto ReadProduct(Integer ProductId);

    // readAll
    List<ProductDto> ReadAllProduct();

    // delete
    void DeleteProduct(Integer productId);

    // update
    String UpdateProduct(ProductDto productDto, Integer ProductId);

    List<ProductDto> getByProductByCategory(String category);
    
    List<ProductResponseForFilter> getProductsByFilter(String category, Integer fromPrice, Integer toPrice, String search);
    
    List<String> getAllCategories();

}
