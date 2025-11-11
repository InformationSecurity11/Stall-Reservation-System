package com.yourcompany.profile.repository;

import com.yourcompany.profile.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    // Find a user by their unique email (useful for security context)
    Optional<UserProfile> findByContactEmail(String contactEmail);
}