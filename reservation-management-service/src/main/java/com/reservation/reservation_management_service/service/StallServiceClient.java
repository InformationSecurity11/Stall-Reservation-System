package com.reservation.reservation_management_service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class StallServiceClient {

    private final WebClient.Builder webClientBuilder;

    @Value("${service.stall.url}")
    private String stallServiceUrl;

    /**
     * Get stall price from stall service
     */
    public BigDecimal getStallPrice(String stallId) {
        try {
            WebClient webClient = webClientBuilder.baseUrl(stallServiceUrl).build();
            
            StallDTO stall = webClient.get()
                    .uri("/{id}", stallId)
                    .retrieve()
                    .bodyToMono(StallDTO.class)
                    .block();

            if (stall != null && stall.getPrice() != null) {
                return stall.getPrice();
            }
            
            log.warn("Stall price not found for ID: {}, using default", stallId);
            return BigDecimal.valueOf(5000); // Default price
            
        } catch (Exception e) {
            log.error("Failed to fetch stall price for ID: {}", stallId, e);
            // Return default price if service is unavailable
            return BigDecimal.valueOf(5000);
        }
    }

    /**
     * Check if stall exists
     */
    public boolean stallExists(String stallId) {
        try {
            WebClient webClient = webClientBuilder.baseUrl(stallServiceUrl).build();
            
            StallDTO stall = webClient.get()
                    .uri("/{id}", stallId)
                    .retrieve()
                    .bodyToMono(StallDTO.class)
                    .block();

            return stall != null;
            
        } catch (Exception e) {
            log.error("Failed to check stall existence for ID: {}", stallId, e);
            return false;
        }
    }

    /**
     * Internal DTO for stall data
     */
    @lombok.Data
    private static class StallDTO {
        private String id;
        private String name;
        private String location;
        private String size;
        private BigDecimal price;
        private String status;
    }
}
