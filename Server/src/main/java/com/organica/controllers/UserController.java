package com.organica.controllers;

import com.organica.entities.User;
import com.organica.payload.AddreesDto;
import com.organica.payload.SingIn;
import com.organica.payload.UserDto;
import com.organica.response.AddressReposeModel;
import com.organica.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/singup")
    public ResponseEntity<String> CreateUser(@RequestBody UserDto userDto){

        String userDto1 = this.userService.CreateUser(userDto);

        return new ResponseEntity<>(userDto1, HttpStatusCode.valueOf(200));
    }


    @PostMapping("/singin")
    public ResponseEntity<SingIn> CreateUser(@RequestBody SingIn singIn) {

        SingIn singIn1 = this.userService.SingIn(singIn);
        return new ResponseEntity<>(singIn1, HttpStatusCode.valueOf(200));
    }
    
    @PostMapping("updateUserRole/{userId}/{role}")
    public String updateUserRle(@PathVariable int userId, @PathVariable String role) {

        return userService.updateUserRole(userId, role);
    }
    

    @PostMapping("/addAddress")
    public String addUserAddress(String userId, @RequestBody AddreesDto addressDto) {
        return userService.addUserAddress(userId, addressDto);
    }

    @PutMapping("/updateAddress")
    public String updateUserAddress(String addressId, @RequestBody AddreesDto addressDto) {
        return userService.updateUserAddress(addressId, addressDto);
    }

    @GetMapping("/getAddressById")
    public ResponseEntity<AddressReposeModel> getAddressById(String addressId) {
        return userService.getAddressById(addressId);
    }
    @GetMapping("/getAddressByUserId")
    public ResponseEntity<List<AddressReposeModel>> getAddressByUserId(String userId) {
        return userService.getAddressByUserId(userId);
    }
    
}
