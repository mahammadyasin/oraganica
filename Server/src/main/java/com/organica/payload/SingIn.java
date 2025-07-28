package com.organica.payload;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class SingIn {

    private String Email;
    private String Password;
    private String jwt;
    private List<String> role;

}
