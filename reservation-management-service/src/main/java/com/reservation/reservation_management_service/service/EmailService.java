package com.reservation.reservation_management_service.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${reservation.email.from}")
    private String fromEmail;

    @Value("${reservation.email.subject}")
    private String emailSubject;

    /**
     * Send reservation confirmation email with QR code attachment
     */
    public void sendReservationConfirmationEmail(
            String toEmail,
            String companyName,
            Long reservationId,
            List<String> stallIds,
            LocalDate startDate,
            LocalDate endDate,
            String qrCode,
            String qrCodeFilePath
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject(emailSubject);

            String emailContent = buildEmailContent(
                    companyName, reservationId, stallIds, startDate, endDate, qrCode
            );
            helper.setText(emailContent, true);

            // Attach QR code image
            if (qrCodeFilePath != null) {
                FileSystemResource file = new FileSystemResource(new File(qrCodeFilePath));
                helper.addAttachment("QRCode-Reservation-" + reservationId + ".png", file);
            }

            mailSender.send(message);
            log.info("Confirmation email sent to: {}", toEmail);

        } catch (MessagingException e) {
            log.error("Failed to send email to: {}", toEmail, e);
            throw new RuntimeException("Failed to send confirmation email", e);
        }
    }

    /**
     * Build HTML email content
     */
    private String buildEmailContent(
            String companyName,
            Long reservationId,
            List<String> stallIds,
            LocalDate startDate,
            LocalDate endDate,
            String qrCode
    ) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
        String stallList = String.join(", ", stallIds);

        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #7C3AED 0%%, #EC4899 100%%); 
                                 color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                        .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; 
                                   border-left: 4px solid #7C3AED; }
                        .qr-section { text-align: center; margin: 30px 0; padding: 20px; background: white; 
                                     border-radius: 8px; }
                        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                        .button { display: inline-block; padding: 12px 30px; background: #7C3AED; 
                                 color: white; text-decoration: none; border-radius: 6px; margin: 10px 0; }
                        h1 { margin: 0; font-size: 28px; }
                        h2 { color: #7C3AED; margin-top: 0; }
                        .highlight { color: #EC4899; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎉 Reservation Confirmed!</h1>
                            <p>Colombo International BookFair 2026</p>
                        </div>
                        
                        <div class="content">
                            <p>Dear <strong>%s</strong>,</p>
                            
                            <p>Thank you for your reservation! We're excited to have you at the Colombo International BookFair 2026.</p>
                            
                            <div class="info-box">
                                <h2>📋 Reservation Details</h2>
                                <p><strong>Reservation ID:</strong> <span class="highlight">#%d</span></p>
                                <p><strong>Stall(s):</strong> %s</p>
                                <p><strong>Event Dates:</strong> %s - %s</p>
                            </div>
                            
                            <div class="qr-section">
                                <h2>🎫 Your Entry Pass</h2>
                                <p>Your unique QR code for entry:</p>
                                <p style="font-family: monospace; font-size: 14px; background: #f0f0f0; 
                                   padding: 10px; border-radius: 6px; word-break: break-all;">
                                    %s
                                </p>
                                <p><strong>⚠️ Important:</strong> Please download and save the attached QR code. 
                                   You'll need to present it at the entrance.</p>
                            </div>
                            
                            <div class="info-box">
                                <h2>📍 Next Steps</h2>
                                <ol>
                                    <li>Download the attached QR code image</li>
                                    <li>Add your literary genres via the dashboard</li>
                                    <li>Arrive at the venue on %s</li>
                                    <li>Show your QR code at the entrance</li>
                                </ol>
                            </div>
                            
                            <p>If you have any questions, please don't hesitate to contact us.</p>
                            
                            <p>We look forward to seeing you at the fair!</p>
                            
                            <p>Best regards,<br>
                            <strong>Sri Lanka Book Publishers' Association</strong></p>
                        </div>
                        
                        <div class="footer">
                            <p>© 2026 Colombo International BookFair. All rights reserved.</p>
                            <p>This is an automated message, please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(
                companyName,
                reservationId,
                stallList,
                startDate.format(formatter),
                endDate.format(formatter),
                qrCode,
                startDate.format(formatter)
        );
    }

    /**
     * Send cancellation email
     */
    public void sendCancellationEmail(
            String toEmail,
            String companyName,
            Long reservationId,
            String reason
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Reservation Cancelled - Colombo BookFair");

            String emailContent = """
                    <!DOCTYPE html>
                    <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #DC2626;">Reservation Cancelled</h2>
                            <p>Dear <strong>%s</strong>,</p>
                            <p>Your reservation #%d has been cancelled.</p>
                            <p><strong>Reason:</strong> %s</p>
                            <p>If you have any questions, please contact us.</p>
                            <p>Best regards,<br>Sri Lanka Book Publishers' Association</p>
                        </div>
                    </body>
                    </html>
                    """.formatted(companyName, reservationId, reason != null ? reason : "Not specified");

            helper.setText(emailContent, true);
            mailSender.send(message);
            log.info("Cancellation email sent to: {}", toEmail);

        } catch (MessagingException e) {
            log.error("Failed to send cancellation email to: {}", toEmail, e);
        }
    }
}
