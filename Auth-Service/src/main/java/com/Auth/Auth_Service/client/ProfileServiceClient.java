package com.Auth.Auth_Service.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Service client for inter-service communication with Profile Management Service
 */
@Service
public class ProfileServiceClient {

    private final RestTemplate restTemplate;
    
    @Value("${services.profile.url:http://profile-management-service:8081}")
    private String profileServiceUrl;

    public ProfileServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Create or update user profile
     */
    public Object createUserProfile(Object profileData) {
        try {
            String url = profileServiceUrl + "/api/profiles";
            return restTemplate.postForObject(url, profileData, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create user profile: " + e.getMessage());
        }
    }

    /**
     * Get user profile by user ID
     */
    public Object getUserProfile(Long userId) {
        try {
            String url = profileServiceUrl + "/api/profiles/user/" + userId;
            return restTemplate.getForObject(url, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch user profile: " + e.getMessage());
        }
    }

    /**
     * Delete user profile
     */
    public boolean deleteUserProfile(Long userId) {
        try {
            String url = profileServiceUrl + "/api/profiles/" + userId;
            restTemplate.delete(url);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete user profile: " + e.getMessage());
        }
    }
}
