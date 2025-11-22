package com.bookfair.stallmanagement.dto;

import com.bookfair.stallmanagement.model.Stall;
import com.bookfair.stallmanagement.model.Stall.StallSize;
import com.bookfair.stallmanagement.model.Stall.StallStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StallResponse {
    
    private String id;
    
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
    
    private boolean available;
    
    public static StallResponse fromEntity(Stall stall) {
        return StallResponse.builder()
                .id(stall.getId())
                .stallCode(stall.getStallCode())
                .name(stall.getName())
                .size(stall.getSize())
                .status(stall.getStatus())
                .section(stall.getSection())
                .row(stall.getRow())
                .column(stall.getColumn())
                .xPosition(stall.getXPosition())
                .yPosition(stall.getYPosition())
                .width(stall.getWidth())
                .length(stall.getLength())
                .pricePerDay(stall.getPricePerDay())
                .description(stall.getDescription())
                .available(stall.getStatus() == StallStatus.AVAILABLE)
                .build();
    }
}