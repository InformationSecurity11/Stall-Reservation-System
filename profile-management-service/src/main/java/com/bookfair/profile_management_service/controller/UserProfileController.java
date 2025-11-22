package com.bookfair.profile_management_service.controller; // Updated Package

import com.bookfair.profile_management_service.model.UserProfile;
import com.bookfair.profile_management_service.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/profiles") // Changed URL to match service name better
@CrossOrigin(origins = "*")
public class UserProfileController {

    @Autowired
    private UserProfileService service;

    @PostMapping
    public UserProfile createProfile(@RequestBody UserProfile profile) {
        return service.saveProfile(profile);
    }

    @GetMapping("/{userId}")
    public UserProfile getProfile(@PathVariable String userId) {
        return service.getProfile(userId);
    }

    @PutMapping("/{userId}/genres")
    public UserProfile addGenres(@PathVariable String userId, @RequestBody List<String> genres) {
        return service.addGenres(userId, genres);
    }

    @GetMapping
    public List<UserProfile> getAllProfiles() {
        return service.getAllProfiles();
    }
}