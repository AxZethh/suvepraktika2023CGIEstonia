package com.cgi.library.security;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter  extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = httpServletRequest.getHeader("Authorization");
        final String token;

        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            Claims user = jwtUtil.extractEmail(token);
            Authentication authentication = new UsernamePasswordAuthenticationToken(user.getSubject(),"", List.of(new SimpleGrantedAuthority("ROLE_" + user.get("Role"))));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
