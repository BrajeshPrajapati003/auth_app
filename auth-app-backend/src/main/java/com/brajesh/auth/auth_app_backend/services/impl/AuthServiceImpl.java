package com.brajesh.auth.auth_app_backend.services.impl;

import com.brajesh.auth.auth_app_backend.dtos.UserDto;
import com.brajesh.auth.auth_app_backend.services.AuthService;
import com.brajesh.auth.auth_app_backend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;

    @Override
    public UserDto registerUser(UserDto userDto){

        // logic
        // verfiy email
        // verify password
        // default roles
        UserDto userDto1 = userService.createUser(userDto);
        return userDto1;
    }
}
