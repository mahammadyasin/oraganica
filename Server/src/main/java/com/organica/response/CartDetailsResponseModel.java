package com.organica.response;

import java.util.List;

import com.organica.payload.CartDetailDto;
import com.organica.payload.ProductDto;
import com.organica.payload.UserDto;

import lombok.Data;

@Data
public class CartDetailsResponseModel {

    private int Id;

    // private UserResponseModel user;
    private int Userid;
    private String UserName;
    private String Email;

    private float TotalAmount;

    private List<CartDetailDto> cartDetalis;
}