package com.cgi.library.security;

import com.cgi.library.entity.User;
import com.cgi.library.model.AuthToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class JwtUtil {

    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(Decoders.BASE64.decode("b1e16af32ede62d3aa4b9c5591fd3c832baf9a05b39fe665652abf61de3af0e92af931a5f09e4e31fed3c94b7f5e0ddcebf56bf825b76883a6dddcaaf51d5413"));

    public AuthToken generateToken(User user) {
        AuthToken authToken = new AuthToken();
        authToken.setExpiration(Date.from(Instant.now().plusMillis(1000 * 60 * 60 * 24)));

        String jwtBuilder = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("Role", user.getRole())
                .setExpiration(authToken.getExpiration())
                .setIssuer("CGI Library")
                .signWith(SECRET_KEY)
                .compact();

        authToken.setToken(jwtBuilder);
        return authToken;
    }

    public Claims extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
