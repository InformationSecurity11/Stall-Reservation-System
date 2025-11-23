package com.Auth.Auth_Service.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "JWT_SECRET=K8f$9s@1!zLw#7QpG3vBnE^tR4mYxP0uDdFsH*Wc";

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 5000 * 60 * 60)) // 5 hours
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

}
