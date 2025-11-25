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
    
    public UserProfile updateProfile(String userId, UserProfile updatedData) {
        
        UserProfile existingProfile = getProfile(userId);

        
        if (updatedData.getFullName() != null) existingProfile.setFullName(updatedData.getFullName());
        if (updatedData.getEmail() != null) existingProfile.setEmail(updatedData.getEmail());
        if (updatedData.getCompanyName() != null) existingProfile.setCompanyName(updatedData.getCompanyName());
        if (updatedData.getAddress() != null) existingProfile.setAddress(updatedData.getAddress());
        if (updatedData.getPhoneNumber() != null) existingProfile.setPhoneNumber(updatedData.getPhoneNumber());
        
        
        return repository.save(existingProfile);
    }

    
    public void deleteProfile(String userId) {
        UserProfile profile = getProfile(userId);
        repository.delete(profile);
    }
}