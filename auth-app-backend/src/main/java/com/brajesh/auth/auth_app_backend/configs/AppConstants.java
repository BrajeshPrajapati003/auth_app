package com.brajesh.auth.auth_app_backend.configs;

public class AppConstants {

    public static final String[] AUTH_PUBLIC_URLS = {
            "/api/v1/auth/**",
            "/v3/api-docs/**",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/error",

    };

    public static final String ADMIN_ROLE = "ADMIN";
    public static final String GUEST_ROLE = "GUEST";

}