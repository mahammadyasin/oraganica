package com.organica.repositories;

import com.organica.response.ProductResponseForFilter;
import com.organica.entities.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product, Integer> {

        @Query("SELECT new com.organica.response.ProductResponseForFilter(p.ProductId, p.ProductName, p.Description, p.Price, p.Weight, p.Img,p.category) "
                        +
                        "FROM Product p WHERE p.category = :category")
        List<ProductResponseForFilter> findByCategory(@Param("category") String category);

        @Query("SELECT new com.organica.response.ProductResponseForFilter(p.ProductId, p.ProductName, p.Description, p.Price, p.Weight, p.category) "
                        +
                        "FROM Product p WHERE " +
                        "LOWER(p.ProductName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
                        "LOWER(p.Description) LIKE LOWER(CONCAT('%', :search, '%'))")
        List<ProductResponseForFilter> findByProductBySearch(@Param("search") String search);

        @Query("SELECT new com.organica.response.ProductResponseForFilter(p.ProductId, p.ProductName, p.Description, p.Price, p.Weight, p.Img,p.category) "
                        +
                        "FROM Product p WHERE p.category IN :categories")
        List<ProductResponseForFilter> findByCategorieList(List<String> categories);

        // List<ProductResponseForFilter> findAll();

        @Query("SELECT new com.organica.response.ProductResponseForFilter(p.ProductId, p.ProductName, p.Description, p.Price, p.Weight, p.category) "
                        +
                        "FROM Product p WHERE p.Price BETWEEN :fromPrice AND :toPrice")
        List<ProductResponseForFilter> findByPriceRange(@Param("fromPrice") Float fromPrice,
                        @Param("toPrice") Float toPrice);

}
