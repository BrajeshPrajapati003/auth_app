package com.brajesh.auth.auth_app_backend.security;

import com.brajesh.auth.auth_app_backend.entities.Provider;
import com.brajesh.auth.auth_app_backend.entities.RefreshToken;
import com.brajesh.auth.auth_app_backend.entities.User;
import com.brajesh.auth.auth_app_backend.repositories.RefreshTokenRepository;
import com.brajesh.auth.auth_app_backend.repositories.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.auth.frontend.success-redirect}")
    private String frontEndSuccessUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        logger.info("Successful Authentication");
        logger.info(authentication.toString());


        if (!(authentication.getPrincipal() instanceof OAuth2User oAuth2User)) {
            throw new IllegalStateException("Principal is not OAuth2User");
        }

        String registrationId = "unknown";
        if (authentication instanceof OAuth2AuthenticationToken token) {
            registrationId = token.getAuthorizedClientRegistrationId();
        }

        Map<String, Object> attributes = oAuth2User.getAttributes();
        if (attributes == null || attributes.isEmpty()) {
            throw new RuntimeException("OAuth2 attributes missing");
        }

        User user = switch (registrationId) {
            case "google" -> {
                String googleId = String.valueOf(attributes.getOrDefault("sub", ""));

                String email = String.valueOf(attributes.getOrDefault("email", ""));
                String name = String.valueOf(attributes.getOrDefault("name", ""));
                String picture = String.valueOf(attributes.getOrDefault("picture", ""));

                if (email.isBlank()) {
                    throw new RuntimeException("Email not provided by Google");
                }

                if (googleId.isBlank()) {
                    throw new RuntimeException("Google ID missing");
                }

                yield userRepository.findByEmail(email).orElseGet(() -> {
                    User newUser = User.builder()
                            .email(email)
                            .name(name)
                            .image(picture)
                            .enable(true)
                            .provider(Provider.GOOGLE)
                            .providerId(googleId)
                            .build();
//                    specify default role
                    return userRepository.save(newUser);
                });
            }

            case "github" -> {

                String name = String.valueOf(attributes.getOrDefault("login", ""));
                String email = String.valueOf(attributes.getOrDefault("email", ""));
                String githubId = String.valueOf(attributes.getOrDefault("id", ""));
                String image = String.valueOf(attributes.getOrDefault("avatar_url", ""));

                if (email.isBlank()) {
                    throw new RuntimeException("Email not provided by Github");
                }

                if (githubId.isBlank()) {
                    throw new RuntimeException("Github ID missing");
                }

                yield userRepository.findByEmail(email).orElseGet(() -> {
                    User newUser = User.builder()
                            .email(email)
                            .name(name)
                            .image(image)
                            .enable(true)
                            .provider(Provider.GITHUB)
                            .providerId(githubId)
                            .build();
//                    specify default role
                    return userRepository.save(newUser);
                });
            }

            default -> throw new RuntimeException("Invalid registration id!");
        };

        logger.info("Logged in user: {}", user.getEmail());

        // Username, user email
        // New user creation
        // jwt token -> token ke saath frontend pe redirect

//        refresh: user -> refresh token unko revoke
        // Refresh the token
        String jti = UUID.randomUUID().toString();
        RefreshToken refreshTokenOb = RefreshToken.builder().jti(jti).user(user)
                .revoked(false).
                createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .build();
        refreshTokenRepository.save(refreshTokenOb);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenOb.getJti());
        cookieService.attachRefreshCookie(response, refreshToken, (int) jwtService.getRefreshTtlSeconds());
//        response.getWriter().write("Login successful");
        response.sendRedirect(frontEndSuccessUrl);
    }
}
