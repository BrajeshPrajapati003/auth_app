package com.brajesh.auth.auth_app_backend.auth.payload;

public record LoginRequest(
        String email,
        String password
) {
}
