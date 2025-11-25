package com.bookfair.stallmanagement.dto;

import com.bookfair.stallmanagement.model.Stall.StallStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StallStatusRequest {
    
    private StallStatus status;
}