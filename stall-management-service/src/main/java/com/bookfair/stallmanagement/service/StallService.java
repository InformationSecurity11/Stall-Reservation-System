package com.bookfair.stallmanagement.service;

import com.bookfair.stallmanagement.dto.AvailabilityResponse;
import com.bookfair.stallmanagement.dto.StallRequest;
import com.bookfair.stallmanagement.dto.StallResponse;
import com.bookfair.stallmanagement.model.Stall;
import com.bookfair.stallmanagement.model.Stall.StallSize;
import com.bookfair.stallmanagement.model.Stall.StallStatus;
import com.bookfair.stallmanagement.repository.StallRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StallService {
    
    private final StallRepository stallRepository;
    
    // CREATE
    public StallResponse createStall(StallRequest request) {
        if (stallRepository.existsByStallCode(request.getStallCode())) {
            throw new RuntimeException("Stall with code '" + request.getStallCode() + "' already exists");
        }
        Stall stall = Stall.fromRequest(request);
        stall.setStatus(StallStatus.AVAILABLE);
        Stall saved = stallRepository.save(stall);
        return StallResponse.fromEntity(saved);
    }
    
    // READ - GET ALL
    public List<StallResponse> getAllStalls() {
        return stallRepository.findAll().stream()
                .map(StallResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    // READ - GET BY ID
    public StallResponse getStallById(String id) {
        Stall stall = stallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stall not found with id: " + id));
        return StallResponse.fromEntity(stall);
    }
    
    // READ - GET BY CODE
    public StallResponse getStallByCode(String stallCode) {
        Stall stall = stallRepository.findByStallCode(stallCode)
                .orElseThrow(() -> new RuntimeException("Stall not found with code: " + stallCode));
        return StallResponse.fromEntity(stall);
    }
    
    // READ - GET AVAILABLE
    public List<StallResponse> getAvailableStalls() {
        return stallRepository.findByStatus(StallStatus.AVAILABLE).stream()
                .map(StallResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    // READ - FILTER BY SIZE
    public List<StallResponse> getStallsBySize(StallSize size) {
        return stallRepository.findBySize(size).stream()
                .map(StallResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    // READ - FILTER BY STATUS
    public List<StallResponse> getStallsByStatus(StallStatus status) {
        return stallRepository.findByStatus(status).stream()
                .map(StallResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    // READ - FILTER BY SECTION
    public List<StallResponse> getStallsBySection(String section) {
        return stallRepository.findBySection(section).stream()
                .map(StallResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    // READ - AVAILABLE BY SIZE
    public List<StallResponse> getAvailableStallsBySize(StallSize size) {
        return stallRepository.findBySizeAndStatus(size, StallStatus.AVAILABLE).stream()
                .map(StallResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    // READ - AVAILABLE BY SECTION
    public List<StallResponse> getAvailableStallsBySection(String section) {
        return stallRepository.findBySectionAndStatus(section, StallStatus.AVAILABLE).stream()
                .map(StallResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    // UPDATE
    public StallResponse updateStall(String id, StallRequest request) {
        Stall stall = stallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stall not found with id: " + id));
        
        if (request.getName() != null) stall.setName(request.getName());
        if (request.getSize() != null) stall.setSize(request.getSize());
        if (request.getSection() != null) stall.setSection(request.getSection());
        if (request.getRow() != null) stall.setRow(request.getRow());
        if (request.getColumn() != null) stall.setColumn(request.getColumn());
        if (request.getXPosition() != null) stall.setXPosition(request.getXPosition());
        if (request.getYPosition() != null) stall.setYPosition(request.getYPosition());
        if (request.getWidth() != null) stall.setWidth(request.getWidth());
        if (request.getLength() != null) stall.setLength(request.getLength());
        if (request.getPricePerDay() != null) stall.setPricePerDay(request.getPricePerDay());
        if (request.getDescription() != null) stall.setDescription(request.getDescription());
        
        Stall updated = stallRepository.save(stall);
        return StallResponse.fromEntity(updated);
    }
    
    // UPDATE STATUS BY ID
    public StallResponse updateStallStatusById(String id, StallStatus status) {
        Stall stall = stallRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stall not found with id: " + id));
        stall.setStatus(status);
        Stall updated = stallRepository.save(stall);
        return StallResponse.fromEntity(updated);
    }
    
    // UPDATE STATUS BY CODE
    public StallResponse updateStallStatusByCode(String stallCode, StallStatus status) {
        Stall stall = stallRepository.findByStallCode(stallCode)
                .orElseThrow(() -> new RuntimeException("Stall not found with code: " + stallCode));
        stall.setStatus(status);
        Stall updated = stallRepository.save(stall);
        return StallResponse.fromEntity(updated);
    }
    
    // DELETE
    public void deleteStall(String id) {
        if (!stallRepository.existsById(id)) {
            throw new RuntimeException("Stall not found with id: " + id);
        }
        stallRepository.deleteById(id);
    }
    
    // CHECK AVAILABILITY BY CODE
    public AvailabilityResponse checkAvailabilityByCode(String stallCode) {
        return stallRepository.findByStallCode(stallCode)
                .map(stall -> AvailabilityResponse.builder()
                        .stallCode(stallCode)
                        .available(stall.getStatus() == StallStatus.AVAILABLE)
                        .message(stall.getStatus() == StallStatus.AVAILABLE 
                                ? "Stall is available" 
                                : "Stall is " + stall.getStatus().toString().toLowerCase())
                        .build())
                .orElse(AvailabilityResponse.builder()
                        .stallCode(stallCode)
                        .available(false)
                        .message("Stall not found")
                        .build());
    }
    
    // CHECK AVAILABILITY BY ID
    public AvailabilityResponse checkAvailabilityById(String id) {
        return stallRepository.findById(id)
                .map(stall -> AvailabilityResponse.builder()
                        .stallCode(stall.getStallCode())
                        .available(stall.getStatus() == StallStatus.AVAILABLE)
                        .message(stall.getStatus() == StallStatus.AVAILABLE 
                                ? "Stall is available" 
                                : "Stall is " + stall.getStatus().toString().toLowerCase())
                        .build())
                .orElse(AvailabilityResponse.builder()
                        .stallCode(null)
                        .available(false)
                        .message("Stall not found")
                        .build());
    }
}