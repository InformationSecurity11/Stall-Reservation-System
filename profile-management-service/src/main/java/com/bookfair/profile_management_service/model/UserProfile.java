package com.bookfair.user_profile_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "profiles")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Links to the Auth Service Login ID
    private String userId; 

    // Basic Info
    private String fullName;
    private String email;
    private String phoneNumber;

    // Vendor Specific Info 
    private String companyName;
    private String businessRegNo;
    private String address;

    // Literary Genres (e.g., "Fiction", "Sci-Fi") 
    @ElementCollection
    private List<String> literaryGenres;

    // Role: "VENDOR" or "ADMIN" (Employee) [cite: 34]
    private String role; 
}