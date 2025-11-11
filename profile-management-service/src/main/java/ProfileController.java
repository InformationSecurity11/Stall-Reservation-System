package com.yourcompany.profile.controller;

import com.yourcompany.profile.dto.EditProfileRequest;
import com.yourcompany.profile.model.UserProfile;
import com.yourcompany.profile.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profiles")
public class ProfileController {

    private final UserProfileService userProfileService;

    public ProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    /**
     * PUT endpoint to update a user profile by ID.
     * Endpoint: PUT /api/v1/profiles/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateProfile(
            @PathVariable Long id,
            @RequestBody EditProfileRequest request) {

        try {
            // Note: In a real application, the ID would usually come from the
            // JWT token (security context) and not directly from the path variable.
            UserProfile updatedProfile = userProfileService.editProfile(id, request);
            return ResponseEntity.ok(updatedProfile);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Or other appropriate error handling
        }
    }
}