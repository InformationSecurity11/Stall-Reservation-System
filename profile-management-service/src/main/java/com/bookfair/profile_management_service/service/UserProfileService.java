package com.bookfair.profile_management_service.service;

import com.bookfair.profile_management_service.dto.AuthUserDTO;
import com.bookfair.profile_management_service.dto.RichProfileRequest;
import com.bookfair.profile_management_service.dto.VendorDashboardDTO;
import com.bookfair.profile_management_service.model.UserProfile;
import com.bookfair.profile_management_service.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository repository;
    
    private final RestTemplate restTemplate = new RestTemplate();

    // --- BASIC CRUD ---
    public UserProfile getProfile(String userId) { 
        return repository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found: " + userId)); 
    }
    
    public UserProfile saveProfile(UserProfile profile) {
        String r = profile.getRole();
        // Validate Role
        if (r == null || (!r.equalsIgnoreCase("Admin") && !r.equalsIgnoreCase("User"))) {
            throw new IllegalArgumentException("Invalid Role: " + r + ". Role must be 'Admin' or 'User'.");
        }
        // Normalize Role
        if (r.equalsIgnoreCase("Admin")) profile.setRole("Admin");
        if (r.equalsIgnoreCase("User")) profile.setRole("User");
        
        return repository.save(profile);
    }

    public void deleteProfile(String userId) { 
        UserProfile p = getProfile(userId); 
        repository.delete(p); 
    }
    
    public UserProfile updateRichProfile(String userId, RichProfileRequest request) {
        UserProfile p = getProfile(userId);
        if (request.getBusinessDescription() != null) p.setBusinessDescription(request.getBusinessDescription());
        if (request.getProfileImageUrl() != null) p.setProfileImageUrl(request.getProfileImageUrl());
        if (request.getWebsiteUrl() != null) p.setWebsiteUrl(request.getWebsiteUrl());
        if (request.getFacebookUrl() != null) p.setFacebookUrl(request.getFacebookUrl());
        return repository.save(p);
    }
    
    public List<UserProfile> searchByGenre(String genre) { 
        return repository.findByLiteraryGenresContaining(genre); 
    }

    // --- AGGREGATOR: DASHBOARD ---
    public VendorDashboardDTO getVendorDashboard(String userId, String token) {
        VendorDashboardDTO dashboard = new VendorDashboardDTO();

        UserProfile profile = getProfile(userId);
        dashboard.setProfile(profile);

        // Call Reservation Service
        String reservationUrl = "http://localhost:8083/api/reservations/user/" + userId;
        try {
            List<Object> reservations = restTemplate.getForObject(reservationUrl, List.class);
            dashboard.setMyReservations(reservations);
            dashboard.setTotalReservations(reservations != null ? reservations.size() : 0);
        } catch (Exception e) {
            dashboard.setMyReservations(Collections.emptyList());
            dashboard.setTotalReservations(0);
        }

        // Call Auth Service
        if (profile.getEmail() != null) {
            String authUrl = "http://localhost:9090/api/auth/user/details?email=" + profile.getEmail();
            
            // DEBUG LOGS
            System.out.println("DEBUG: Calling Auth Service: " + authUrl);
            System.out.println("DEBUG: Using Token: " + token);
            
            try {
                HttpHeaders headers = new HttpHeaders();
                if (token != null) {
                    headers.set("Authorization", token);
                }
                HttpEntity<String> entity = new HttpEntity<>(headers);

                ResponseEntity<AuthUserDTO> authResponse = restTemplate.exchange(
                    authUrl, HttpMethod.GET, entity, AuthUserDTO.class
                );
                
                dashboard.setAccountDetails(authResponse.getBody());
            } catch (Exception e) {
                System.err.println("DEBUG ERROR: Auth Call Failed: " + e.getMessage());
            }
        }
        return dashboard;
    }
}