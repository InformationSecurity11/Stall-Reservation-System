package com.bookfair.stallmanagement.model;

import com.bookfair.stallmanagement.dto.StallRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "stalls")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stall {
    
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String stallCode;
    
    private String name;
    
    private StallSize size;
    
    private StallStatus status;
    
    private String section;
    
    private Integer row;
    
    private Integer column;
    
    private Double xPosition;
    
    private Double yPosition;
    
    private Double width;
    
    private Double length;
    
    private Double pricePerDay;
    
    private String description;
    
    public enum StallSize {
        SMALL, MEDIUM, LARGE
    }
    
    public enum StallStatus {
        AVAILABLE, RESERVED, MAINTENANCE
    }
    
    public static Stall fromRequest(StallRequest request) {
        return Stall.builder()
                .stallCode(request.getStallCode())
                .name(request.getName())
                .size(request.getSize())
                .status(request.getStatus() != null ? request.getStatus() : StallStatus.AVAILABLE)
                .section(request.getSection())
                .row(request.getRow())
                .column(request.getColumn())
                .xPosition(request.getXPosition())
                .yPosition(request.getYPosition())
                .width(request.getWidth())
                .length(request.getLength())
                .pricePerDay(request.getPricePerDay())
                .description(request.getDescription())
                .build();
    }
}