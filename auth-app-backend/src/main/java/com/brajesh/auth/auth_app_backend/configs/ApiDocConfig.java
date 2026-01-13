package com.brajesh.auth.auth_app_backend.configs;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Auth App – Universal Authentication Service",
                description = """
                        A secure, scalable, and production-ready authentication service 
                        that provides login, registration, JWT-based access control, 
                        refresh token rotation, OAuth2 social login, and session management.
                        
                        This service is designed to be easily plugged into any application, 
                        so you don’t have to rebuild authentication from scratch every time.
                        """,
                summary = "Plug-and-play authentication system for modern applications",
                version = "1.0.0",
                contact = @Contact(
                        name = "Brajesh Prajapati",
                        url = "https://brajeshprajapati003.netlify.app/",
                        email = "prajapatibrajesh003@gmail.com"
                )
        ),
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer", // Authorization: Bearer token
        bearerFormat = "JWT"

)
public class ApiDocConfig {

}
