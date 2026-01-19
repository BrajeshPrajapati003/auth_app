package com.brajesh.auth.auth_app_backend.services.impl;

import com.brajesh.auth.auth_app_backend.dtos.UserDto;
import com.brajesh.auth.auth_app_backend.entities.Provider;
import com.brajesh.auth.auth_app_backend.entities.User;
import com.brajesh.auth.auth_app_backend.exceptions.ResourceNotFoundException;
import com.brajesh.auth.auth_app_backend.repositories.UserRepository;
import com.brajesh.auth.auth_app_backend.services.UserService;
import com.brajesh.auth.auth_app_backend.utils.UserHelper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {
        if(userDto.getEmail() == null || userDto.getEmail().isBlank()){
            throw new IllegalArgumentException("Email is required!");
        }
        if(userRepository.existsByEmail(userDto.getEmail())){
            throw new IllegalArgumentException("User with given email already exists!");
        }
        // If you have extra checks --> put here

        User user = modelMapper.map(userDto, User.class);

        // Force enable to true if null
        if(user.getEnable() == null){
            user.setEnable(true);
        }
        user.setProvider(userDto.getProvider() != null ? userDto.getProvider() : Provider.LOCAL);

        // Role assign here to user --> for auth
        // TODO:
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given email id!"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId) {
        UUID uId = UserHelper.parseUuid(userId);
        User existingUser =  userRepository
                .findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given ID!"));

        // We are not going to change email id for this project
        if(userDto.getName() != null) existingUser.setName(userDto.getName());
        if(userDto.getImage() != null) existingUser.setImage(userDto.getImage());
        if(userDto.getProvider() != null) existingUser.setProvider(userDto.getProvider());
        // TODO: change the password updation logic...
        if(userDto.getPassword() != null) existingUser.setPassword(userDto.getPassword());
        existingUser.setUpdatedAt(Instant.now());
        if (userDto.getEnable() != null) {
            existingUser.setEnable(userDto.getEnable());
        }
        User updatedUser = userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public void deleteUser(String userId) {
        UUID uId = UserHelper.parseUuid(userId);
        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given ID!"));
        userRepository.delete(user);
    }

    @Override
    public UserDto getUserById(String userId) {
        User user = userRepository
                .findById(UserHelper.parseUuid(userId))
                .orElseThrow(()-> new ResourceNotFoundException("User not found with given ID!"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public Iterable<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(user ->
                        modelMapper.map(user, UserDto.class))
                .toList();
    }
}