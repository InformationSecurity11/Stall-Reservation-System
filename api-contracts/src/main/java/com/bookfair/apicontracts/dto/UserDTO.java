package com.bookfair.apicontracts.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Unified User DTO for inter-service communication
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "Role is required")
    private String role; // ADMIN, VENDOR, CUSTOMER
    
    private String companyName;
    private String contactNumber;
    private String owner;
    
    // For profile data
    private String fullName;
    private String phoneNumber;
    private String businessRegNo;
    private String address;
}
