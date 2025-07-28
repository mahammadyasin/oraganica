package com.organica.services;

import java.lang.StackWalker.Option;

import com.organica.payload.AddreesDto;
import com.organica.payload.SingIn;
import com.organica.payload.UserDto;

public interface UserService {


    String CreateUser(UserDto userDto);

    SingIn SingIn(SingIn singIn);

    String updateUserRole(int userId, String role);

    String updateUserAddress(String userId, AddreesDto addressDto);
}
