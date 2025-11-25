package com.bookfair.apicontracts.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Unified Reservation DTO for inter-service communication
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDTO {
    private Long id;
    
    @NotNull(message = "User ID is required")
    @Positive(message = "User ID must be positive")
    private Long userId;
    
    @NotBlank(message = "User email is required")
    @Email(message = "User email should be valid")
    private String userEmail;
    
    private String companyName;
    
    @NotEmpty(message = "At least one stall must be selected")
    private List<String> stallIds;
    
    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be today or in the future")
    private LocalDate startDate;
    
    @NotNull(message = "End date is required")
    private LocalDate endDate;
    
    @NotNull(message = "Status is required")
    private ReservationStatus status;
    
    @NotNull(message = "Payment status is required")
    private PaymentStatus paymentStatus;
    
    @NotNull(message = "Total price is required")
    @Positive(message = "Total price must be positive")
    private BigDecimal totalPrice;
    
    private String qrCode;
    private String qrCodePath;
    
    private List<String> genres;
    private String notes;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime cancelledAt;
    private String cancellationReason;
    private LocalDateTime confirmedAt;
    
    public enum ReservationStatus {
        PENDING, CONFIRMED, CANCELLED, COMPLETED
    }
    
    public enum PaymentStatus {
        PENDING, PAID, REFUNDED, FAILED
    }
}
