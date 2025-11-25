package com.bookfair.profile_management_service.dto;

import lombok.Data;

@Data
public class AuthUserDTO {
    // Fields matching the JSON response from your Auth Service
    private String email;
    private String role;
    private String companyName;
    private String contactNumber;
    private String owner;
}