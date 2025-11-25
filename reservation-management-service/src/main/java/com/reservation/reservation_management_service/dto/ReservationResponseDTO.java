package com.reservation.reservation_management_service.dto;

import com.reservation.reservation_management_service.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationResponseDTO {

    private Long id;
    private Long userId;
    private String userEmail;
    private String companyName;
    private List<String> stallIds;
    private List<StallDTO> stalls;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String paymentStatus;
    private BigDecimal totalPrice;
    private String qrCode;
    private List<String> genres;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime confirmedAt;
    private LocalDateTime cancelledAt;
    private String cancellationReason;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StallDTO {
        private String id;
        private String name;
        private String location;
        private String size;
        private BigDecimal price;
    }

    public static ReservationResponseDTO fromEntity(Reservation reservation) {
        return ReservationResponseDTO.builder()
                .id(reservation.getId())
                .userId(reservation.getUserId())
                .userEmail(reservation.getUserEmail())
                .companyName(reservation.getCompanyName())
                .stallIds(reservation.getStallIds())
                .startDate(reservation.getStartDate())
                .endDate(reservation.getEndDate())
                .status(reservation.getStatus().name())
                .paymentStatus(reservation.getPaymentStatus().name())
                .totalPrice(reservation.getTotalPrice())
                .qrCode(reservation.getQrCode())
                .genres(reservation.getGenres())
                .notes(reservation.getNotes())
                .createdAt(reservation.getCreatedAt())
                .updatedAt(reservation.getUpdatedAt())
                .confirmedAt(reservation.getConfirmedAt())
                .cancelledAt(reservation.getCancelledAt())
                .cancellationReason(reservation.getCancellationReason())
                .build();
    }
}
