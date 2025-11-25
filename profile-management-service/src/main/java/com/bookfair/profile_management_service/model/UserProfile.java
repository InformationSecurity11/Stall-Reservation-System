package com.bookfair.profile_management_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "profiles")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- Basic Info (Synced from Auth Service) ---
    @Column(unique = true, nullable = false)
    private String userId; 
    private String fullName;
    private String email;
    private String phoneNumber;
    private String companyName;
    private String address;

    // --- RICH DATA (Extended Profile Features) ---
    
    @Column(length = 2000) // Allow long text for "About Us"
    private String businessDescription; 
    
    private String profileImageUrl; // URL to logo
    
    private String websiteUrl;
    private String facebookUrl;

    // --- GENRES (For Search & Categorization) ---
    @ElementCollection
    @CollectionTable(name = "user_profile_literary_genres", joinColumns = @JoinColumn(name = "user_profile_id"))
    @Column(name = "literary_genres")
    private List<String> literaryGenres;

    private String role; 
}