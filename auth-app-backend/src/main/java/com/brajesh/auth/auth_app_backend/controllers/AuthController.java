package com.brajesh.auth.auth_app_backend.controllers;

import com.brajesh.auth.auth_app_backend.dtos.LoginRequest;
import com.brajesh.auth.auth_app_backend.dtos.TokenResponse;
import com.brajesh.auth.auth_app_backend.dtos.UserDto;
import com.brajesh.auth.auth_app_backend.entities.RefreshToken;
import com.brajesh.auth.auth_app_backend.entities.User;
import com.brajesh.auth.auth_app_backend.repositories.RefreshTokenRepository;
import com.brajesh.auth.auth_app_backend.repositories.UserRepository;
import com.brajesh.auth.auth_app_backend.security.JwtService;
import com.brajesh.auth.auth_app_backend.services.AuthService;
import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.Token;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ModelMapper mapper;

    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(
            @RequestBody LoginRequest loginRequest
    ){
        // Authenticate
         Authentication authenticate = authenticate(loginRequest);
        User user = userRepository.findByEmail(loginRequest.email()).orElseThrow(()->
                new BadCredentialsException(("Invalid Username or Password!")));

        if(!user.isEnable()){
            throw new DisabledException("User is Disabled...");
        }

        String jti = UUID.randomUUID().toString();
        var refreshTokenOb = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .revoked(false)
                .build();

        // Save the info. of  refresh token
        refreshTokenRepository.save(refreshTokenOb);

        // Generate Access & Refresh Tokens
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenOb.getJti());

        TokenResponse tokenResponse = TokenResponse.of(accessToken, refreshToken, jwtService.getAccessTtlSeconds(), mapper.map(user, UserDto.class));
        return ResponseEntity.ok(tokenResponse);
    }

    private Authentication authenticate(LoginRequest loginRequest) {

        // Rethrowing the BadCredentialsExceptions -> learning ExceptionHandling
        try {
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()
                    )
            );

        }catch (Exception e){
            throw new BadCredentialsException("Invalid Username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userDto));
    }
}
