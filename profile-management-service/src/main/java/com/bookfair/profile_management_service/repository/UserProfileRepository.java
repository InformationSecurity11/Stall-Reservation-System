package com.bookfair.profile_management_service.repository;

import com.bookfair.profile_management_service.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

/*
public interface UserProfileRepository extends MongoRepository<UserProfile, String> {
    Optional<UserProfile> findByUserId(String userId);
}
*/

// Changed back to JpaRepository<UserProfile, Long>
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserId(String userId);
}