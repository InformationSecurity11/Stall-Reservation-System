package com.bookfair.apicontracts.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Generic API Response wrapper for consistent response format across all services
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApiResponseDTO<T> {
    private boolean success;
    private T data;
    private String message;
    private String error;
    private long timestamp;
    
    public static <T> ApiResponseDTO<T> success(T data, String message) {
        return ApiResponseDTO.<T>builder()
                .success(true)
                .data(data)
                .message(message)
                .timestamp(System.currentTimeMillis())
                .build();
    }
    
    public static <T> ApiResponseDTO<T> error(String error, String message) {
        return ApiResponseDTO.<T>builder()
                .success(false)
                .error(error)
                .message(message)
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
