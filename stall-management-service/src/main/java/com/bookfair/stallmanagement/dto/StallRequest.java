package com.bookfair.stallmanagement.dto;

import com.bookfair.stallmanagement.model.Stall.StallSize;
import com.bookfair.stallmanagement.model.Stall.StallStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StallRequest {
    
    private String stallCode;
    
    private String name;
    
    private StallSize size;
    
    private StallStatus status;
    
    private String section;
    
    private Integer row;
    
    private Integer column;
    
    private Double xPosition;
    
    private Double yPosition;
    
    private Double width;
    
    private Double length;
    
    private BigDecimal pricePerDay;  // Changed from Double to BigDecimal
    
    private String description;
}