package com.reservation.reservation_management_service.repository;

import com.reservation.reservation_management_service.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Find all reservations by user ID
    List<Reservation> findByUserId(Long userId);

    // Find reservations by user ID and status
    List<Reservation> findByUserIdAndStatus(Long userId, Reservation.ReservationStatus status);

    // Find reservation by QR code
    Optional<Reservation> findByQrCode(String qrCode);

    // Count active reservations for a user (PENDING or CONFIRMED)
    @Query("SELECT COUNT(r) FROM Reservation r WHERE r.userId = :userId AND r.status IN ('PENDING', 'CONFIRMED')")
    Long countActiveReservationsByUserId(@Param("userId") Long userId);

    // Check if stall is reserved for a date range
    @Query("SELECT COUNT(r) FROM Reservation r JOIN r.stallIds s WHERE s = :stallId " +
           "AND r.status IN ('PENDING', 'CONFIRMED') " +
           "AND ((r.startDate <= :endDate AND r.endDate >= :startDate))")
    Long countStallReservationsInDateRange(
            @Param("stallId") String stallId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // Get all reservations for admin
    @Query("SELECT r FROM Reservation r ORDER BY r.createdAt DESC")
    List<Reservation> findAllReservationsOrderByCreatedDesc();

    // Find reservations by status
    List<Reservation> findByStatus(Reservation.ReservationStatus status);

    // Find reservations by date range
    @Query("SELECT r FROM Reservation r WHERE r.startDate >= :startDate AND r.endDate <= :endDate")
    List<Reservation> findReservationsByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // Count total stalls reserved by a user
    @Query("SELECT SUM(SIZE(r.stallIds)) FROM Reservation r WHERE r.userId = :userId AND r.status IN ('PENDING', 'CONFIRMED')")
    Long countTotalStallsReservedByUser(@Param("userId") Long userId);

    // Find reservations containing a specific stall
    @Query("SELECT r FROM Reservation r JOIN r.stallIds s WHERE s = :stallId")
    List<Reservation> findReservationsByStallId(@Param("stallId") String stallId);
}
