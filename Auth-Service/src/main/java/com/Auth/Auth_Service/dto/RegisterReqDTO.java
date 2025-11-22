package com.Auth.Auth_Service.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterReqDTO {
    private String email;
    private String password;
    private String role;
    private String companyName;
    private String contactNumber;
    private String owner;

}
