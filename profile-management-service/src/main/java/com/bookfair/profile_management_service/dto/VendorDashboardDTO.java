package com.bookfair.profile_management_service.dto;

import com.bookfair.profile_management_service.model.UserProfile;
import lombok.Data;
import java.util.List;

@Data
public class VendorDashboardDTO {
    // 1. Data from Profile Service
    private UserProfile profile;
    
    // 2. Data from Reservation Service
    private List<Object> myReservations; 
    
    // 3. Simple stats
    private int totalReservations;
}