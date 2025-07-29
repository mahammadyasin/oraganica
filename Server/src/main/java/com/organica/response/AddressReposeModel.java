package com.organica.response;

import lombok.Data;

@Data
public class AddressReposeModel {
    private String addressId;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String landmark;
}
