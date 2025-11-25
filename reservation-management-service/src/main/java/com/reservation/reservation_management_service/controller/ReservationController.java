package com.reservation.reservation_management_service.controller;

import com.reservation.reservation_management_service.dto.*;
import com.reservation.reservation_management_service.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * Create a new reservation
     */
    @PostMapping
    public ResponseEntity<ApiResponse<ReservationResponseDTO>> createReservation(
            @Valid @RequestBody ReservationRequestDTO request,
            @RequestAttribute("userId") Long userId,
            @RequestAttribute("userEmail") String userEmail,
            @RequestAttribute(value = "companyName", required = false) String companyName
    ) {
        ReservationResponseDTO reservation = reservationService.createReservation(
                request, userId, userEmail, companyName
        );
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(reservation, "Reservation created successfully"));
    }

    /**
     * Get all reservations for logged-in user
     */
    @GetMapping("/my-reservations")
    public ResponseEntity<ApiResponse<List<ReservationResponseDTO>>> getUserReservations(
            @RequestAttribute("userId") Long userId
    ) {
        List<ReservationResponseDTO> reservations = reservationService.getUserReservations(userId);
        return ResponseEntity.ok(ApiResponse.success(reservations, "Reservations retrieved successfully"));
    }

    /**
     * Get reservation by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ReservationResponseDTO>> getReservationById(
            @PathVariable Long id,
            @RequestAttribute("userId") Long userId
    ) {
        ReservationResponseDTO reservation = reservationService.getReservationById(id, userId);
        return ResponseEntity.ok(ApiResponse.success(reservation, "Reservation retrieved successfully"));
    }

    /**
     * Cancel a reservation
     */
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<ReservationResponseDTO>> cancelReservation(
            @PathVariable Long id,
            @RequestAttribute("userId") Long userId,
            @RequestBody(required = false) CancelReservationRequestDTO request
    ) {
        String reason = request != null ? request.getReason() : null;
        ReservationResponseDTO reservation = reservationService.cancelReservation(id, userId, reason);
        return ResponseEntity.ok(ApiResponse.success(reservation, "Reservation cancelled successfully"));
    }

    /**
     * Update genres for a reservation
     */
    @PatchMapping("/{id}/genres")
    public ResponseEntity<ApiResponse<ReservationResponseDTO>> updateGenres(
            @PathVariable Long id,
            @RequestAttribute("userId") Long userId,
            @Valid @RequestBody UpdateGenresRequestDTO request
    ) {
        ReservationResponseDTO reservation = reservationService.updateGenres(id, userId, request.getGenres());
        return ResponseEntity.ok(ApiResponse.success(reservation, "Genres updated successfully"));
    }

    /**
     * Get QR code for a reservation
     */
    @GetMapping("/{id}/qrcode")
    public ResponseEntity<ApiResponse<QRCodeResponseDTO>> getQRCode(
            @PathVariable Long id,
            @RequestAttribute("userId") Long userId
    ) {
        QRCodeResponseDTO qrCode = reservationService.getQRCode(id, userId);
        return ResponseEntity.ok(ApiResponse.success(qrCode, "QR code retrieved successfully"));
    }

    /**
     * Download QR code image
     */
    @GetMapping("/{id}/qrcode/download")
    public ResponseEntity<Resource> downloadQRCode(
            @PathVariable Long id,
            @RequestAttribute("userId") Long userId
    ) {
        ReservationResponseDTO reservation = reservationService.getReservationById(id, userId);
        
        if (reservation.getQrCode() == null) {
            return ResponseEntity.notFound().build();
        }

        // In a real implementation, you'd retrieve the actual file path from the service
        File file = new File("./uploads/qrcodes/QR-" + id + ".png");
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);
        
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .header(HttpHeaders.CONTENT_DISPOSITION, 
                        "attachment; filename=\"QRCode-Reservation-" + id + ".png\"")
                .body(resource);
    }

    /**
     * Verify QR code (for entry validation - no auth required)
     */
    @GetMapping("/verify-qr")
    public ResponseEntity<ApiResponse<ReservationResponseDTO>> verifyQRCode(
            @RequestParam String code
    ) {
        ReservationResponseDTO reservation = reservationService.verifyQRCode(code);
        return ResponseEntity.ok(ApiResponse.success(reservation, "QR code verified successfully"));
    }

    // ========== ADMIN ENDPOINTS ==========

    /**
     * Get all reservations (Admin only)
     */
    @GetMapping("/admin/all")
    public ResponseEntity<ApiResponse<List<ReservationResponseDTO>>> getAllReservations(
            @RequestAttribute("userRole") String userRole
    ) {
        // Simple role check (in production, use proper authorization)
        if (!"ADMIN".equalsIgnoreCase(userRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Access denied", "Admin access required"));
        }

        List<ReservationResponseDTO> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(ApiResponse.success(reservations, "All reservations retrieved successfully"));
    }

    /**
     * Get reservations by status (Admin only)
     */
    @GetMapping("/admin/status/{status}")
    public ResponseEntity<ApiResponse<List<ReservationResponseDTO>>> getReservationsByStatus(
            @PathVariable String status,
            @RequestAttribute("userRole") String userRole
    ) {
        if (!"ADMIN".equalsIgnoreCase(userRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ApiResponse.error("Access denied", "Admin access required"));
        }

        List<ReservationResponseDTO> reservations = reservationService.getReservationsByStatus(status);
        return ResponseEntity.ok(ApiResponse.success(reservations, 
                "Reservations with status '" + status + "' retrieved successfully"));
    }
}
