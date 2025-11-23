package com.reservation.reservation_management_service.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QRCodeService {

    @Value("${file.upload.dir:./uploads/qrcodes}")
    private String uploadDir;

    /**
     * Generate a unique QR code string
     */
    public String generateQRCodeString(Long reservationId, Long userId) {
        return String.format("BOOKFAIR-2026-RES-%d-USER-%d-%s", 
                reservationId, userId, UUID.randomUUID().toString().substring(0, 8));
    }

    /**
     * Generate QR code image and save to file
     */
    public String generateQRCodeImage(String qrCodeText, String fileName) throws WriterException, IOException {
        int width = 300;
        int height = 300;

        // Create QR code
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, width, height);

        // Ensure upload directory exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save to file
        Path filePath = uploadPath.resolve(fileName + ".png");
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", filePath);

        return filePath.toString();
    }

    /**
     * Generate QR code as Base64 string
     */
    public String generateQRCodeBase64(String qrCodeText) throws WriterException, IOException {
        int width = 300;
        int height = 300;

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, width, height);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        byte[] qrCodeBytes = outputStream.toByteArray();
        return Base64.getEncoder().encodeToString(qrCodeBytes);
    }

    /**
     * Read QR code image file and convert to Base64
     */
    public String readQRCodeAsBase64(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        byte[] fileContent = Files.readAllBytes(path);
        return Base64.getEncoder().encodeToString(fileContent);
    }
}
