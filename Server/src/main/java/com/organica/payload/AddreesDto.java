package com.organica.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddreesDto {
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String landmark;
}
