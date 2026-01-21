package com.brajesh.auth.auth_app_backend.auth.config;

import com.brajesh.auth.auth_app_backend.auth.repositories.UserRepository;

import com.brajesh.auth.auth_app_backend.auth.services.impl.JwtService;
import com.brajesh.auth.auth_app_backend.auth.utils.UserHelper;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        logger.info("Authorization Header: {}", header);

        if(header != null && header.startsWith("Bearer ")){

            // Token extract and validate then create authentication and then store in security context
            String token = header.substring(7);

            try{

                if(!jwtService.isAccessToken(token)){
                    filterChain.doFilter(request, response);
                    return;
                }

                Jws<Claims> parse = jwtService.parse(token);
                Claims payload = parse.getPayload();
                String userId = payload.getSubject();
                UUID userUuid = UserHelper.parseUuid(userId);

                userRepository.findById(userUuid)
                        .ifPresent(user -> {

                            // Check for user enable or not
                            if(user.getEnable()){
                                // User is found from DB
                                List<GrantedAuthority> authorities = user.getRoles()==null ? List.of(): user.getRoles().stream()
                                        .map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

                                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                                        user, null, authorities
                                );

                                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                                // Set the authenticationToken in security context
                                if(SecurityContextHolder.getContext().getAuthentication()==null) {
                                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                                }
                            }
                        });

            }catch (ExpiredJwtException e){
//                e.printStackTrace();
                request.setAttribute("error", "Token Expired!");
            } catch (Exception e){
//                e.printStackTrace();
                request.setAttribute("error", "Invalid Token!");

            }
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        return request.getRequestURI().startsWith("/api/v1/auth/");
    }

}
