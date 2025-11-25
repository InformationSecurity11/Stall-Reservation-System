package com.bookfair.profile_management_service.controller;

import com.bookfair.profile_management_service.dto.RichProfileRequest;
import com.bookfair.profile_management_service.dto.VendorDashboardDTO;
import com.bookfair.profile_management_service.model.UserProfile;
import com.bookfair.profile_management_service.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "*")
public class UserProfileController {

    @Autowired
    private UserProfileService service;

    // --- 1. CREATE PROFILE ---
    @PostMapping
    public ResponseEntity<?> createProfile(@RequestBody UserProfile profile) {
        try {
            return ResponseEntity.ok(service.saveProfile(profile));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // --- 2. GET PROFILE ---
    @GetMapping("/{userId}")
    public UserProfile getProfile(@PathVariable String userId) {
        return service.getProfile(userId);
    }

    // --- 3. EDIT COMPLETE PROFILE (Basic + Rich Info) ---
    @PutMapping("/{userId}")
    public ResponseEntity<UserProfile> updateProfile(@PathVariable String userId, 
                                                     @RequestBody UserProfile updatedData) {
         UserProfile existingProfile = service.getProfile(userId);
         
         // --- Basic Info Updates ---
         if (updatedData.getFullName() != null) existingProfile.setFullName(updatedData.getFullName());
         if (updatedData.getPhoneNumber() != null) existingProfile.setPhoneNumber(updatedData.getPhoneNumber());
         if (updatedData.getCompanyName() != null) existingProfile.setCompanyName(updatedData.getCompanyName());
         if (updatedData.getAddress() != null) existingProfile.setAddress(updatedData.getAddress());
         
         // --- Rich Info Updates ---
         if (updatedData.getBusinessDescription() != null) existingProfile.setBusinessDescription(updatedData.getBusinessDescription());
         if (updatedData.getProfileImageUrl() != null) existingProfile.setProfileImageUrl(updatedData.getProfileImageUrl());
         if (updatedData.getWebsiteUrl() != null) existingProfile.setWebsiteUrl(updatedData.getWebsiteUrl());
         if (updatedData.getFacebookUrl() != null) existingProfile.setFacebookUrl(updatedData.getFacebookUrl());

         return ResponseEntity.ok(service.saveProfile(existingProfile));
    }

    // --- 4. DELETE PROFILE ---
    // FIXED: Return type changed from String to ResponseEntity<String>
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteProfile(@PathVariable String userId) {
        service.deleteProfile(userId);
        return ResponseEntity.ok("Profile deleted");
    }

    // --- EXTENDED FEATURES ---

    @PatchMapping("/{userId}/rich-info")
    public ResponseEntity<UserProfile> updateRichInfo(@PathVariable String userId, @RequestBody RichProfileRequest request) {
        return ResponseEntity.ok(service.updateRichProfile(userId, request));
    }

    @PutMapping("/{userId}/genres")
    public ResponseEntity<UserProfile> updateGenres(@PathVariable String userId, @RequestBody List<String> genres) {
        UserProfile profile = service.getProfile(userId);
        profile.setLiteraryGenres(genres);
        return ResponseEntity.ok(service.saveProfile(profile));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<UserProfile>> searchVendors(@RequestParam String genre) {
        return ResponseEntity.ok(service.searchByGenre(genre));
    }

    // Vendor Dashboard (Aggregator)
    @GetMapping("/{userId}/dashboard")
    public ResponseEntity<VendorDashboardDTO> getDashboard(
            @PathVariable String userId,
            @RequestHeader(value = "Authorization", required = false) String token) {
        
        System.out.println("DEBUG: Dashboard Request for " + userId);
        return ResponseEntity.ok(service.getVendorDashboard(userId, token));
    }
}