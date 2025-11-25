package com.bookfair.profile_management_service.dto;

import com.bookfair.profile_management_service.model.UserProfile;
import lombok.Data;
import java.util.List;

@Data
public class VendorDashboardDTO {
    private UserProfile profile;
    private List<Object> myReservations; 
    private AuthUserDTO accountDetails; // Ensure AuthUserDTO.java also exists in this folder!
    private int totalReservations;
}