package com.brajesh.auth.auth_app_backend.auth.services;

import com.brajesh.auth.auth_app_backend.auth.payload.UserDto;

public interface AuthService {
    UserDto registerUser(UserDto userDto);
    // login user
}
