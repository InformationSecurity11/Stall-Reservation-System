package com.bookfair.stallmanagement.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Service client for inter-service communication with Reservation Management Service
 */
@Service
public class ReservationServiceClient {

    private final RestTemplate restTemplate;
    
    @Value("${services.reservation.url:http://reservation-management-service:8083}")
    private String reservationServiceUrl;

    public ReservationServiceClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Get reservations by stall ID
     */
    public Object getReservationsByStallId(String stallId) {
        try {
            String url = reservationServiceUrl + "/api/reservations/stall/" + stallId;
            return restTemplate.getForObject(url, Object.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch reservations for stall: " + e.getMessage());
        }
    }

    /**
     * Check if stall is reserved for date range
     */
    public boolean isStallReserved(String stallId, String startDate, String endDate) {
        try {
            String url = reservationServiceUrl + "/api/reservations/stall/" + stallId + 
                        "/availability?startDate=" + startDate + "&endDate=" + endDate;
            Boolean available = restTemplate.getForObject(url, Boolean.class);
            return !(available != null && available);  // Inverse because endpoint returns availability
        } catch (Exception e) {
            throw new RuntimeException("Failed to check stall reservation status: " + e.getMessage());
        }
    }
}
