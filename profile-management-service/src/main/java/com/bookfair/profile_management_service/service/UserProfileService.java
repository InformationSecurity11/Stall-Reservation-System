package com.bookfair.profile_management_service.service;

import com.bookfair.profile_management_service.dto.RichProfileRequest;
import com.bookfair.profile_management_service.dto.VendorDashboardDTO;
import com.bookfair.profile_management_service.model.UserProfile;
import com.bookfair.profile_management_service.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository repository;
    
    // Tool for Service-to-Service communication
    private final RestTemplate restTemplate = new RestTemplate();

    // --- BASIC CRUD ---
    public UserProfile getProfile(String userId) {
        return repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
    }

    public UserProfile saveProfile(UserProfile profile) {
        return repository.save(profile);
    }
    
    public void deleteProfile(String userId) {
        UserProfile profile = getProfile(userId);
        repository.delete(profile);
    }

    // --- EXTENDED PROFILE: UPDATE RICH DATA ---
    public UserProfile updateRichProfile(String userId, RichProfileRequest request) {
        UserProfile profile = getProfile(userId);
        
        // Update fields only if provided (Partial Update)
        if (request.getBusinessDescription() != null) profile.setBusinessDescription(request.getBusinessDescription());
        if (request.getProfileImageUrl() != null) profile.setProfileImageUrl(request.getProfileImageUrl());
        if (request.getWebsiteUrl() != null) profile.setWebsiteUrl(request.getWebsiteUrl());
        if (request.getFacebookUrl() != null) profile.setFacebookUrl(request.getFacebookUrl());
        
        return repository.save(profile);
    }

    // --- PUBLIC CATALOG: SEARCH ---
    public List<UserProfile> searchByGenre(String genre) {
        return repository.findByLiteraryGenresContaining(genre);
    }

    // --- AGGREGATOR: VENDOR DASHBOARD ---
    public VendorDashboardDTO getVendorDashboard(String userId) {
        VendorDashboardDTO dashboard = new VendorDashboardDTO();

        // 1. Get Local Profile Data
        UserProfile profile = getProfile(userId);
        dashboard.setProfile(profile);

        // 2. Call Reservation Service
        // NOTE: Ensure your Reservation Service is running and has an endpoint to get bookings by userId.
        // I am assuming it runs on port 8083 to avoid conflict with Stall Service (8082).
        String reservationServiceUrl = "http://localhost:8083/api/reservations/user/" + userId;
        
        try {
            List<Object> reservations = restTemplate.getForObject(reservationServiceUrl, List.class);
            dashboard.setMyReservations(reservations);
            dashboard.setTotalReservations(reservations != null ? reservations.size() : 0);
        } catch (Exception e) {
            // Graceful Fallback: If Reservation service is down, show empty list instead of crashing
            System.err.println("Aggregator Warning: Could not connect to Reservation Service - " + e.getMessage());
            dashboard.setMyReservations(Collections.emptyList());
            dashboard.setTotalReservations(0);
        }

        return dashboard;
    }
}