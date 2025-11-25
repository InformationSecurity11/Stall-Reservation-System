package com.bookfair.profile_management_service.repository;

import com.bookfair.profile_management_service.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    
    // Find unique user
    Optional<UserProfile> findByUserId(String userId);

    // Custom Search: Find vendors selling specific genres (e.g., "Sci-Fi")
    List<UserProfile> findByLiteraryGenresContaining(String genre);
}