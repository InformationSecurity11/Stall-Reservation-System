package com.Auth.Auth_Service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterReqDTO {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Role is required")
    @Pattern(regexp = "(?i)^(Admin|User)$", message = "Role must be either 'Admin' or 'User'")
    private String role;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    @NotBlank(message = "Owner name is required")
    private String owner;
}
