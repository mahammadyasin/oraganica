package com.organica.services.impl;

import com.organica.config.JwtService;
import com.organica.entities.Address;
import com.organica.entities.Cart;
import com.organica.entities.Role;
import com.organica.entities.TotalRoles;
import com.organica.entities.User;
import com.organica.payload.AddreesDto;
import com.organica.payload.SingIn;
import com.organica.payload.UserDto;
import com.organica.repositories.RoleRepository;
import com.organica.repositories.UserRepo;
import com.organica.services.UserService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserServiceImpl implements UserService {



    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;



    @Override
    public String CreateUser(UserDto userDto) {
        User user = this.modelMapper.map(userDto, User.class);
        List<Role> list = new ArrayList<>();
        // list.add(new Role(TotalRoles.ADMIN.name()));

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Cart cart = new Cart();
        cart.setUser(user);
        user.setCart(cart);

        user = userRepo.save(user);
        user.setDate(new Date());

        if (userDto.getRole() != null && !userDto.getRole().isEmpty()) {
            for (String roleName : userDto.getRole()) {
                if (roleName.equals(TotalRoles.ADMIN.name())) {
                    Role role = new Role(TotalRoles.ADMIN.name());
                    role.setUser(user);
                    roleRepository.save(role);
                    list.add(role);
                } else if (roleName.equals(TotalRoles.USER.name())) {
                    Role role = new Role(TotalRoles.USER.name());
                    role.setUser(user);
                    roleRepository.save(role);
                    list.add(role);
                } else {
                    throw new IllegalArgumentException("Invalid role: " + roleName);
                }
            }
        } else {
            Role role = new Role(TotalRoles.USER.name());
            role.setUser(user);
            role = roleRepository.save(role);
            list.add(role);
        }

        user.setRole(list);

        this.userRepo.save(user);
        return "User registred Successfully..!";
    }
    
    

    @Override
    public SingIn SingIn(SingIn singIn) {
        this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(singIn.getEmail(),singIn.getPassword()));
        User user=this.userRepo.findByEmail(singIn.getEmail()).orElseThrow(()->{
            throw new NoSuchElementException("User not found");
        });
        
        List<Role> roles = roleRepository.getRolesByUserId(user.getUserid());

        if (roles.isEmpty()) {
            singIn.setRole(List.of());
        } else {
            singIn.setRole(roles.stream().map(Role::getRole).toList());
        }
        
        var jwtToken=jwtService.generateToken(user);
        singIn.setJwt(jwtToken);
        return singIn;
    }



    @Override
    public String updateUserRole(int userId, String role) {
       User user =  userRepo.findById(userId).orElseThrow(() -> {
            throw new NoSuchElementException("User not found");
       });
        
        user.getRole().forEach(r -> {
            if (r.getRole().equals(role)) {
                throw new IllegalArgumentException("Role already exists for this user");
            }
        });

        Role newRole = new Role(role);
        newRole.setUser(user);
        roleRepository.save(newRole);
        user.getRole().add(newRole);
        userRepo.save(user);
        return "Role updated successfully";
    }



    @Override
    public String updateUserAddress(int userId, AddreesDto addressDto) {
        User user = userRepo.findById(userId).orElseThrow(() -> {
            throw new NoSuchElementException("User not found");
        });

        

        if (user.getAddress() == null) {
            
            user.setAddress(new Address());
        }

        Address address = user.getAddress();
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipCode(addressDto.getZipCode());
        address.setCountry(addressDto.getCountry());
        address.setLandmark(addressDto.getLandmark());

        userRepo.save(user);
        return "Address updated successfully";
    }
}
