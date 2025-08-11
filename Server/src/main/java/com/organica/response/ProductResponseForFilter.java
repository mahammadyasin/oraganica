package com.organica.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductResponseForFilter {
    private int ProductId;
    private String ProductName;
    private String Description;
    private Float Price;
    private Float Weight;
    private byte[] Img;
    private String category;

}