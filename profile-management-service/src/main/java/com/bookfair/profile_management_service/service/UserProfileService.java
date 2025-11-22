package com.bookfair.profile_management_service.service; // Updated Package

import com.bookfair.profile_management_service.model.UserProfile;
import com.bookfair.profile_management_service.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository repository;

    public UserProfile saveProfile(UserProfile profile) {
        return repository.save(profile);
    }

    public UserProfile getProfile(String userId) {
        return repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<UserProfile> getAllProfiles() {
        return repository.findAll();
    }

    public UserProfile addGenres(String userId, List<String> genres) {
        UserProfile profile = getProfile(userId);
        profile.getLiteraryGenres().addAll(genres);
        return repository.save(profile);
    }
}