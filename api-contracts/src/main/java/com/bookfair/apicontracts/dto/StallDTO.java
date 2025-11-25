package com.bookfair.apicontracts.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Unified Stall DTO for inter-service communication
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StallDTO {
    private String id;
    
    @NotBlank(message = "Stall code is required")
    @Unique(message = "Stall code must be unique")
    private String stallCode;
    
    @NotBlank(message = "Stall name is required")
    private String name;
    
    @NotNull(message = "Stall size is required")
    private StallSize size;
    
    @NotNull(message = "Stall status is required")
    private StallStatus status;
    
    private String section;
    
    @Positive(message = "Row must be positive")
    private Integer row;
    
    @Positive(message = "Column must be positive")
    private Integer column;
    
    @PositiveOrZero(message = "X position must be non-negative")
    private Double xPosition;
    
    @PositiveOrZero(message = "Y position must be non-negative")
    private Double yPosition;
    
    @Positive(message = "Width must be positive")
    private Double width;
    
    @Positive(message = "Length must be positive")
    private Double length;
    
    @NotNull(message = "Price per day is required")
    @Positive(message = "Price per day must be positive")
    private BigDecimal pricePerDay;
    
    private String description;
    
    public enum StallSize {
        SMALL, MEDIUM, LARGE
    }
    
    public enum StallStatus {
        AVAILABLE, RESERVED, MAINTENANCE
    }
}

// Custom annotation for unique validation
@java.lang.annotation.Target({java.lang.annotation.ElementType.FIELD})
@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@jakarta.validation.Constraint(validatedBy = {})
@interface Unique {
    String message() default "Value must be unique";
    Class<?>[] groups() default {};
    Class<? extends jakarta.validation.Payload>[] payload() default {};
}
