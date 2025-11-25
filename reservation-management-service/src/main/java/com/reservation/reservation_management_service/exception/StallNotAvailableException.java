package com.reservation.reservation_management_service.exception;

public class StallNotAvailableException extends RuntimeException {
    public StallNotAvailableException(String message) {
        super(message);
    }
}
