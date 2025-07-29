package com.organica.services;

import java.lang.StackWalker.Option;
import java.util.List;

import com.organica.payload.AddreesDto;
import com.organica.payload.SingIn;
import com.organica.payload.UserDto;
import com.organica.response.AddressReposeModel;
import org.springframework.http.ResponseEntity;

public interface UserService {


    String CreateUser(UserDto userDto);

    SingIn SingIn(SingIn singIn);

    String updateUserRole(int userId, String role);

    String addUserAddress(String userId, AddreesDto addressDto);

    String updateUserAddress(String addressId, AddreesDto addressDto);

    ResponseEntity<AddressReposeModel> getAddressById(String addressId);

    ResponseEntity<List<AddressReposeModel>> getAddressByUserId(String userId);
}
