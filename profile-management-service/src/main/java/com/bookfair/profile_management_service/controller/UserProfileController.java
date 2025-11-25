package com.bookfair.profile_management_service.controller;

import com.bookfair.profile_management_service.dto.RichProfileRequest;
import com.bookfair.profile_management_service.dto.VendorDashboardDTO;
import com.bookfair.profile_management_service.model.UserProfile;
import com.bookfair.profile_management_service.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "*") // Allows Frontend (React/Angular) to access this API
public class UserProfileController {

    @Autowired
    private UserProfileService service;

    // --- 1. CREATE PROFILE ---
    // Called by Auth Service after registration
    @PostMapping
    public UserProfile createProfile(@RequestBody UserProfile profile) {
        return service.saveProfile(profile);
    }

    // --- 2. GET PROFILE ---
    @GetMapping("/{userId}")
    public UserProfile getProfile(@PathVariable String userId) {
        return service.getProfile(userId);
    }

    // --- 3. EDIT BASIC PROFILE (Name, Address, Company, Phone) ---
    // Use this to update the standard fields
    @PutMapping("/{userId}")
    public ResponseEntity<UserProfile> updateBasicProfile(@PathVariable String userId, 
                                                          @RequestBody UserProfile updatedData) {
        // First, fetch the existing profile from DB
        UserProfile existingProfile = service.getProfile(userId);
        
        // Update fields ONLY if the user sent them (not null)
        if (updatedData.getFullName() != null) existingProfile.setFullName(updatedData.getFullName());
        if (updatedData.getPhoneNumber() != null) existingProfile.setPhoneNumber(updatedData.getPhoneNumber());
        if (updatedData.getCompanyName() != null) existingProfile.setCompanyName(updatedData.getCompanyName());
        if (updatedData.getAddress() != null) existingProfile.setAddress(updatedData.getAddress());
        
        // Save the updated version
        return ResponseEntity.ok(service.saveProfile(existingProfile));
    }
    
    // --- 4. DELETE PROFILE ---
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteProfile(@PathVariable String userId) {
        service.deleteProfile(userId);
        return ResponseEntity.ok("Profile for user " + userId + " deleted successfully.");
    }

    // --- EXTENDED FEATURES (Rich Data & Dashboard) ---

    // 5. Update Rich Info (Description, Logo, Links)
    @PatchMapping("/{userId}/rich-info")
    public ResponseEntity<UserProfile> updateRichInfo(@PathVariable String userId, 
                                                      @RequestBody RichProfileRequest request) {
        return ResponseEntity.ok(service.updateRichProfile(userId, request));
    }

    // 6. Add/Update Genres (Required for Search)
    @PutMapping("/{userId}/genres")
    public ResponseEntity<UserProfile> updateGenres(@PathVariable String userId, 
                                                    @RequestBody List<String> genres) {
        UserProfile profile = service.getProfile(userId);
        profile.setLiteraryGenres(genres);
        return ResponseEntity.ok(service.saveProfile(profile));
    }

    // 7. Vendor Dashboard (Aggregator)
    // Fetches Profile + Reservations in one call
    @GetMapping("/{userId}/dashboard")
    public ResponseEntity<VendorDashboardDTO> getDashboard(@PathVariable String userId) {
        return ResponseEntity.ok(service.getVendorDashboard(userId));
    }

    // 8. Public Search (Find vendors by genre)
    // Example: /api/profiles/search?genre=Sci-Fi
    @GetMapping("/search")
    public ResponseEntity<List<UserProfile>> searchVendors(@RequestParam String genre) {
        return ResponseEntity.ok(service.searchByGenre(genre));
    }
}