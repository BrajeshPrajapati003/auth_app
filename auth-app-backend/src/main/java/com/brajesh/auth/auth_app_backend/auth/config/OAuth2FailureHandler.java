package com.brajesh.auth.auth_app_backend.auth.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${app.auth.frontend.failure-redirect}")
    private String frontEndFailureUrl;

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request, HttpServletResponse response,
            AuthenticationException ex) throws IOException, ServletException {

        logger.error("Oauth2 Login Failed: {}", ex.getMessage());

        String errorMessage = URLEncoder.encode(
                ex.getMessage(), StandardCharsets.UTF_8);

        response.sendRedirect(frontEndFailureUrl + "?error=" + errorMessage);

    }
}
