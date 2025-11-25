package com.reservation.reservation_management_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QRCodeResponseDTO {

    private String qrCode;
    private String qrCodeImage;  // Base64 encoded image
    private String downloadUrl;
}
