package com.bookfair.profile_management_service.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Service client for inter-service communication with Auth Service
 */
@Service
public class AuthServiceClient {

    private final RestTemplate restTemplate;
    
    @Value("${services.auth.url:http://auth-service:8080}")
    private String authServiceUrl;

    public AuthServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Get user details by email
     */
    public Object getUserByEmail(String email) {
        try {
            String url = authServiceUrl + "/api/auth/user/details?email=" + email;
            return restTemplate.getForObject(url, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch user details: " + e.getMessage());
        }
    }

    /**
     * Get user by ID
     */
    public Object getUserById(Long userId) {
        try {
            String url = authServiceUrl + "/api/auth/user/" + userId;
            return restTemplate.getForObject(url, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch user by ID: " + e.getMessage());
        }
    }

    /**
     * Get all users
     */
    public Object getAllUsers() {
        try {
            String url = authServiceUrl + "/api/auth/users/all";
            return restTemplate.getForObject(url, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch all users: " + e.getMessage());
        }
    }
}
