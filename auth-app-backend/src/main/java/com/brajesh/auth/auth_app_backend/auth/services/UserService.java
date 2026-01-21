package com.brajesh.auth.auth_app_backend.auth.services;

import com.brajesh.auth.auth_app_backend.auth.payload.UserDto;

public interface UserService {

    UserDto createUser(UserDto userDto);
    UserDto getUserByEmail(String email);
    UserDto updateUser(UserDto userDto, String userId);
    void deleteUser(String userId);
    UserDto getUserById(String userId);
    Iterable<UserDto> getAllUsers();

}