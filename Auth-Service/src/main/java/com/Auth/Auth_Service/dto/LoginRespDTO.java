package com.Auth.Auth_Service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRespDTO {
    private String message;
    private String error;
    private String token; // token returned on login
    private UserRespDTO user;
}
