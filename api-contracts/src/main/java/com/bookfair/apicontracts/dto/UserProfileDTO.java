package com.bookfair.apicontracts.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Unified User Profile DTO for inter-service communication
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDTO {
    private String id;
    
    @NotBlank(message = "User ID is required")
    private Long userId;
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    @NotBlank(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    
    // Vendor Info
    private String companyName;
    private String businessRegNo;
    private String address;
    
    // Genres
    @NotEmpty(message = "At least one literary genre should be specified")
    private List<String> literaryGenres;
    
    private String role;
}
