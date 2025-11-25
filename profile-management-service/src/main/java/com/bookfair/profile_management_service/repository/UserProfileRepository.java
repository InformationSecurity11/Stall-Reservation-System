package com.bookfair.profile_management_service.repository;

import com.bookfair.profile_management_service.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    
    // Find unique user by their String userId (from Auth Service)
    Optional<UserProfile> findByUserId(String userId);

    // --- THIS IS THE METHOD YOU WERE MISSING ---
    // It generates a SQL query like: SELECT * FROM profiles WHERE genres LIKE %genre%
    List<UserProfile> findByLiteraryGenresContaining(String genre);
}