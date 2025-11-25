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
    
    // Tool for making HTTP calls to other microservices
    private final RestTemplate restTemplate = new RestTemplate();

    // --- 1. BASIC CRUD OPERATIONS ---

    public UserProfile getProfile(String userId) { 
        return repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId)); 
    }
    
    public UserProfile saveProfile(UserProfile profile) {
        String r = profile.getRole();
        // Validate Role (Must be Admin or User)
        if (r == null || (!r.equalsIgnoreCase("Admin") && !r.equalsIgnoreCase("User"))) {
            throw new IllegalArgumentException("Invalid Role: " + r + ". Role must be 'Admin' or 'User'.");
        }
        // Normalize Role casing
        if (r.equalsIgnoreCase("Admin")) profile.setRole("Admin");
        if (r.equalsIgnoreCase("User")) profile.setRole("User");
        
        return repository.save(profile);
    }

    public void deleteProfile(String userId) { 
        UserProfile p = getProfile(userId); 
        repository.delete(p); 
    }
    
    // --- 2. EXTENDED PROFILE FEATURES ---

    public UserProfile updateRichProfile(String userId, RichProfileRequest request) {
        UserProfile p = getProfile(userId);
        // Partial update: only set fields if they are not null
        if (request.getBusinessDescription() != null) p.setBusinessDescription(request.getBusinessDescription());
        if (request.getProfileImageUrl() != null) p.setProfileImageUrl(request.getProfileImageUrl());
        if (request.getWebsiteUrl() != null) p.setWebsiteUrl(request.getWebsiteUrl());
        if (request.getFacebookUrl() != null) p.setFacebookUrl(request.getFacebookUrl());
        return repository.save(p);
    }
    
    public List<UserProfile> searchByGenre(String genre) { 
        return repository.findByLiteraryGenresContaining(genre); 
    }

    // --- 3. AGGREGATOR: VENDOR DASHBOARD ---
    // Fetches data from Profile DB + Reservation Service + Auth Service
    public VendorDashboardDTO getVendorDashboard(String userId, String token) {
        VendorDashboardDTO dashboard = new VendorDashboardDTO();

        // A. Get Local Profile Data (MySQL)
        UserProfile profile = getProfile(userId);
        dashboard.setProfile(profile);

        // B. Call Reservation Service (Port 8083)
        // Logic: No Security Token needed here (Internal Open API)
        String reservationUrl = "http://localhost:8083/api/reservations/user/" + userId;
        
        try {
            // Simple GET request
            List<Object> reservations = restTemplate.getForObject(reservationUrl, List.class);
            dashboard.setMyReservations(reservations);
            
            // Calculate total count
            if (reservations != null) {
                dashboard.setTotalReservations(reservations.size());
            } else {
                dashboard.setTotalReservations(0);
            }

        } catch (Exception e) {
            // Graceful Fallback: If service is down, don't crash the dashboard
            System.err.println("DEBUG ERROR: Reservation Call Failed: " + e.getMessage());
            dashboard.setMyReservations(Collections.emptyList());
            dashboard.setTotalReservations(0);
        }

        // C. Call Auth Service (Port 9090)
        // Logic: Security Token IS needed here (Protected API)
        if (profile.getEmail() != null) {
            String authUrl = "http://localhost:9090/api/auth/user/details?email=" + profile.getEmail();
            
            try {
                // Prepare Headers with the Token
                HttpHeaders headers = new HttpHeaders();
                if (token != null) {
                    headers.set("Authorization", token);
                }
                HttpEntity<String> entity = new HttpEntity<>(headers);

                // Send Authenticated Request using exchange()
                ResponseEntity<AuthUserDTO> authResponse = restTemplate.exchange(
                    authUrl, 
                    HttpMethod.GET, 
                    entity, 
                    AuthUserDTO.class
                );
                
                dashboard.setAccountDetails(authResponse.getBody());
            } catch (Exception e) {
                System.err.println("DEBUG ERROR: Auth Call Failed: " + e.getMessage());
                // accountDetails will remain null, which is safer than crashing
            }
        }

        return dashboard;
    }
}