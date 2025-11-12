package com.yourcompany.profile.service;

import com.yourcompany.profile.dto.EditProfileRequest;
import com.yourcompany.profile.model.UserProfile;
import com.yourcompany.profile.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileServiceImpl(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * Updates the profile for a user identified by their ID.
     * @param userId The ID of the user whose profile to update.
     * @param request The DTO containing the new profile details.
     * @return The updated UserProfile.
     * @throws RuntimeException if the profile is not found.
     */
    @Override
    public UserProfile editProfile(Long userId, EditProfileRequest request) {
        // 1. Find the existing profile by ID
        UserProfile existingProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found for ID: " + userId));

        // 2. Apply updates from the request DTO
        if (request.getBusinessName() != null) {
            existingProfile.setBusinessName(request.getBusinessName());
        }
        if (request.getContactPerson() != null) {
            existingProfile.setContactPerson(request.getContactPerson());
        }
        if (request.getPhoneNumber() != null) {
            existingProfile.setPhoneNumber(request.getPhoneNumber());
        }

        // 3. Save the updated profile back to the database
        return userProfileRepository.save(existingProfile);
    }

    /**
     * Deletes the profile for a user identified by their ID.
     * @param userId The ID of the user whose profile to delete.
     * @throws RuntimeException if the profile is not found.
     */
    @Override
    public void deleteProfile(Long userId) {
        // 1. Check if the profile exists before attempting to delete
        if (!userProfileRepository.existsById(userId)) {
            throw new RuntimeException("Profile not found for ID: " + userId);
        }

        // 2. Delete the profile by ID
        userProfileRepository.deleteById(userId);
    }
}