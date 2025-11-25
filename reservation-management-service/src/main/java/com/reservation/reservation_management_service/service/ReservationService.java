package com.reservation.reservation_management_service.service;

import com.google.zxing.WriterException;
import com.reservation.reservation_management_service.dto.*;
import com.reservation.reservation_management_service.entity.Reservation;
import com.reservation.reservation_management_service.exception.*;
import com.reservation.reservation_management_service.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final QRCodeService qrCodeService;
    private final EmailService emailService;
    private final StallServiceClient stallServiceClient;

    @Value("${reservation.max-stalls-per-user:3}")
    private int maxStallsPerUser;

    /**
     * Create a new reservation
     */
    @Transactional
    public ReservationResponseDTO createReservation(
            ReservationRequestDTO request,
            Long userId,
            String userEmail,
            String companyName
    ) {
        log.info("Creating reservation for user: {}", userId);

        // Validate date range
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new InvalidReservationException("End date must be after start date");
        }

        // Check if user has reached maximum stall limit
        Long currentStallCount = reservationRepository.countTotalStallsReservedByUser(userId);
        if (currentStallCount == null) {
            currentStallCount = 0L;
        }

        int requestedStalls = request.getStallIds().size();
        if (currentStallCount + requestedStalls > maxStallsPerUser) {
            throw new ReservationLimitExceededException(
                    String.format("Cannot reserve more than %d stalls. You currently have %d stalls reserved.",
                            maxStallsPerUser, currentStallCount)
            );
        }

        // Check stall availability
        for (String stallId : request.getStallIds()) {
            Long reservationCount = reservationRepository.countStallReservationsInDateRange(
                    stallId, request.getStartDate(), request.getEndDate()
            );
            if (reservationCount > 0) {
                throw new StallNotAvailableException(
                        String.format("Stall %s is not available for the selected dates", stallId)
                );
            }
        }

        // Fetch stall details and calculate total price
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (String stallId : request.getStallIds()) {
            try {
                BigDecimal stallPrice = stallServiceClient.getStallPrice(stallId);
                totalPrice = totalPrice.add(stallPrice);
            } catch (Exception e) {
                log.error("Failed to fetch price for stall: {}", stallId, e);
                throw new InvalidReservationException("Unable to fetch stall details: " + stallId);
            }
        }

        // Create reservation entity
        Reservation reservation = Reservation.builder()
                .userId(userId)
                .userEmail(userEmail)
                .companyName(companyName)
                .stallIds(request.getStallIds())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .status(Reservation.ReservationStatus.PENDING)
                .paymentStatus(Reservation.PaymentStatus.PENDING)
                .totalPrice(totalPrice)
                .genres(request.getGenres())
                .notes(request.getNotes())
                .build();

        // Save reservation first to get ID
        reservation = reservationRepository.save(reservation);
        log.info("Reservation created with ID: {}", reservation.getId());

        // Generate and save QR code
        try {
            String qrCodeText = qrCodeService.generateQRCodeString(reservation.getId(), userId);
            String fileName = "QR-" + reservation.getId();
            String qrCodePath = qrCodeService.generateQRCodeImage(qrCodeText, fileName);

            reservation.setQrCode(qrCodeText);
            reservation.setQrCodePath(qrCodePath);
            reservation = reservationRepository.save(reservation);

            log.info("QR code generated for reservation: {}", reservation.getId());
        } catch (WriterException | IOException e) {
            log.error("Failed to generate QR code for reservation: {}", reservation.getId(), e);
            // Don't fail the reservation, just log the error
        }

        // Auto-confirm reservation and send email
        reservation.setStatus(Reservation.ReservationStatus.CONFIRMED);
        reservation.setConfirmedAt(LocalDateTime.now());
        reservation = reservationRepository.save(reservation);

        // Send confirmation email
        try {
            emailService.sendReservationConfirmationEmail(
                    userEmail,
                    companyName,
                    reservation.getId(),
                    reservation.getStallIds(),
                    reservation.getStartDate(),
                    reservation.getEndDate(),
                    reservation.getQrCode(),
                    reservation.getQrCodePath()
            );
            log.info("Confirmation email sent for reservation: {}", reservation.getId());
        } catch (Exception e) {
            log.error("Failed to send confirmation email for reservation: {}", reservation.getId(), e);
            // Don't fail the reservation if email fails
        }

        return ReservationResponseDTO.fromEntity(reservation);
    }

    /**
     * Get all reservations for a user
     */
    public List<ReservationResponseDTO> getUserReservations(Long userId) {
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        return reservations.stream()
                .map(ReservationResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get reservation by ID
     */
    public ReservationResponseDTO getReservationById(Long id, Long userId) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));

        // Verify ownership
        if (!reservation.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Reservation not found with ID: " + id);
        }

        return ReservationResponseDTO.fromEntity(reservation);
    }

    /**
     * Cancel a reservation
     */
    @Transactional
    public ReservationResponseDTO cancelReservation(Long id, Long userId, String reason) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));

        // Verify ownership
        if (!reservation.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Reservation not found with ID: " + id);
        }

        // Check if already cancelled
        if (reservation.getStatus() == Reservation.ReservationStatus.CANCELLED) {
            throw new InvalidReservationException("Reservation is already cancelled");
        }

        // Check if completed
        if (reservation.getStatus() == Reservation.ReservationStatus.COMPLETED) {
            throw new InvalidReservationException("Cannot cancel a completed reservation");
        }

        // Update status
        reservation.setStatus(Reservation.ReservationStatus.CANCELLED);
        reservation.setCancelledAt(LocalDateTime.now());
        reservation.setCancellationReason(reason);
        reservation.setPaymentStatus(Reservation.PaymentStatus.REFUNDED);

        reservation = reservationRepository.save(reservation);
        log.info("Reservation cancelled: {}", id);

        // Send cancellation email
        try {
            emailService.sendCancellationEmail(
                    reservation.getUserEmail(),
                    reservation.getCompanyName(),
                    reservation.getId(),
                    reason
            );
        } catch (Exception e) {
            log.error("Failed to send cancellation email for reservation: {}", id, e);
        }

        return ReservationResponseDTO.fromEntity(reservation);
    }

    /**
     * Update genres for a reservation
     */
    @Transactional
    public ReservationResponseDTO updateGenres(Long id, Long userId, List<String> genres) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));

        // Verify ownership
        if (!reservation.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Reservation not found with ID: " + id);
        }

        reservation.setGenres(genres);
        reservation = reservationRepository.save(reservation);
        log.info("Genres updated for reservation: {}", id);

        return ReservationResponseDTO.fromEntity(reservation);
    }

    /**
     * Get QR code for a reservation
     */
    public QRCodeResponseDTO getQRCode(Long id, Long userId) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));

        // Verify ownership
        if (!reservation.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Reservation not found with ID: " + id);
        }

        if (reservation.getQrCode() == null) {
            throw new ResourceNotFoundException("QR code not found for this reservation");
        }

        try {
            String base64Image = qrCodeService.readQRCodeAsBase64(reservation.getQrCodePath());
            return QRCodeResponseDTO.builder()
                    .qrCode(reservation.getQrCode())
                    .qrCodeImage("data:image/png;base64," + base64Image)
                    .downloadUrl("/api/reservations/" + id + "/qrcode/download")
                    .build();
        } catch (IOException e) {
            log.error("Failed to read QR code for reservation: {}", id, e);
            throw new ResourceNotFoundException("QR code image not found");
        }
    }

    /**
     * Get all reservations (Admin only)
     */
    public List<ReservationResponseDTO> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAllReservationsOrderByCreatedDesc();
        return reservations.stream()
                .map(ReservationResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get reservations by status (Admin only)
     */
    public List<ReservationResponseDTO> getReservationsByStatus(String status) {
        Reservation.ReservationStatus reservationStatus;
        try {
            reservationStatus = Reservation.ReservationStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidReservationException("Invalid status: " + status);
        }

        List<Reservation> reservations = reservationRepository.findByStatus(reservationStatus);
        return reservations.stream()
                .map(ReservationResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Verify QR code (Entry validation)
     */
    public ReservationResponseDTO verifyQRCode(String qrCode) {
        Reservation reservation = reservationRepository.findByQrCode(qrCode)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid QR code"));

        return ReservationResponseDTO.fromEntity(reservation);
    }
}
