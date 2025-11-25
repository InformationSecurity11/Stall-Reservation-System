package com.reservation.reservation_management_service.exception;

public class ReservationLimitExceededException extends RuntimeException {
    public ReservationLimitExceededException(String message) {
        super(message);
    }
}
