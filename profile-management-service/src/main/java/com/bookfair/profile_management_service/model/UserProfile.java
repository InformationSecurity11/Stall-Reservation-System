package com.bookfair.profile_management_service.model;

//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/*
@Document(collection = "profiles") 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    @Id
    private String id; 

    private Long userId;  // Changed from String to Long to match UserEntity
    private String fullName;
    private String email;
    private String phoneNumber;

    // Vendor Info
    private String companyName;
    private String businessRegNo;
    private String address;
    
    // Common fields
    private String contactNumber;
    private String owner;

    // Genres 
    private List<String> literaryGenres;

    private String role; 

}
*/


@Entity
@Table(name = "profiles") // Back to SQL Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Back to Long ID (Auto-increment)

    @Column(unique = true, nullable = false)
    private String userId; 
    private String fullName;
    private String email;
    private String phoneNumber;

    // Vendor Info
    private String companyName;
    private String businessRegNo;
    private String address;

    // --- EXTENDED PROFILE FIELDS ---
    @Column(length = 2000)
    private String businessDescription;
    private String profileImageUrl;
    private String websiteUrl;
    private String facebookUrl;

    @ElementCollection
    @CollectionTable(name = "user_profile_literary_genres", joinColumns = @JoinColumn(name = "user_profile_id"))
    @Column(name = "literary_genres")
    private List<String> literaryGenres;

    private String role; 
}