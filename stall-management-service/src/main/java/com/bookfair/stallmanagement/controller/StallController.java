package com.bookfair.stallmanagement.controller;

import com.bookfair.stallmanagement.dto.AvailabilityResponse;
import com.bookfair.stallmanagement.dto.StallRequest;
import com.bookfair.stallmanagement.dto.StallResponse;
import com.bookfair.stallmanagement.dto.StallStatusRequest;
import com.bookfair.stallmanagement.model.Stall.StallSize;
import com.bookfair.stallmanagement.model.Stall.StallStatus;
import com.bookfair.stallmanagement.service.StallService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stalls")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StallController {
    
    private final StallService stallService;
    
    // CREATE
    @PostMapping
    public ResponseEntity<StallResponse> createStall(@RequestBody StallRequest request) {
        StallResponse response = stallService.createStall(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    // GET ALL
    @GetMapping
    public ResponseEntity<List<StallResponse>> getAllStalls() {
        return ResponseEntity.ok(stallService.getAllStalls());
    }
    
    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<StallResponse> getStallById(@PathVariable String id) {
        return ResponseEntity.ok(stallService.getStallById(id));
    }
    
    // GET BY CODE
    @GetMapping("/code/{stallCode}")
    public ResponseEntity<StallResponse> getStallByCode(@PathVariable String stallCode) {
        return ResponseEntity.ok(stallService.getStallByCode(stallCode));
    }
    
    // GET AVAILABLE
    @GetMapping("/available")
    public ResponseEntity<List<StallResponse>> getAvailableStalls() {
        return ResponseEntity.ok(stallService.getAvailableStalls());
    }
    
    // FILTER BY SIZE
    @GetMapping("/size/{size}")
    public ResponseEntity<List<StallResponse>> getStallsBySize(@PathVariable StallSize size) {
        return ResponseEntity.ok(stallService.getStallsBySize(size));
    }
    
    // FILTER BY STATUS
    @GetMapping("/status/{status}")
    public ResponseEntity<List<StallResponse>> getStallsByStatus(@PathVariable StallStatus status) {
        return ResponseEntity.ok(stallService.getStallsByStatus(status));
    }
    
    // FILTER BY SECTION
    @GetMapping("/section/{section}")
    public ResponseEntity<List<StallResponse>> getStallsBySection(@PathVariable String section) {
        return ResponseEntity.ok(stallService.getStallsBySection(section));
    }
    
    // AVAILABLE BY SIZE
    @GetMapping("/available/size/{size}")
    public ResponseEntity<List<StallResponse>> getAvailableStallsBySize(@PathVariable StallSize size) {
        return ResponseEntity.ok(stallService.getAvailableStallsBySize(size));
    }
    
    // AVAILABLE BY SECTION
    @GetMapping("/available/section/{section}")
    public ResponseEntity<List<StallResponse>> getAvailableStallsBySection(@PathVariable String section) {
        return ResponseEntity.ok(stallService.getAvailableStallsBySection(section));
    }
    
    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<StallResponse> updateStall(@PathVariable String id, @RequestBody StallRequest request) {
        return ResponseEntity.ok(stallService.updateStall(id, request));
    }
    
    // UPDATE STATUS BY ID
    @PatchMapping("/{id}/status")
    public ResponseEntity<StallResponse> updateStallStatusById(@PathVariable String id, @RequestBody StallStatusRequest request) {
        return ResponseEntity.ok(stallService.updateStallStatusById(id, request.getStatus()));
    }
    
    // UPDATE STATUS BY CODE
    @PatchMapping("/code/{stallCode}/status")
    public ResponseEntity<StallResponse> updateStallStatusByCode(@PathVariable String stallCode, @RequestBody StallStatusRequest request) {
        return ResponseEntity.ok(stallService.updateStallStatusByCode(stallCode, request.getStatus()));
    }
    
    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStall(@PathVariable String id) {
        stallService.deleteStall(id);
        return ResponseEntity.noContent().build();
    }
    
    // CHECK AVAILABILITY BY CODE
    @GetMapping("/check-availability/{stallCode}")
    public ResponseEntity<AvailabilityResponse> checkAvailabilityByCode(@PathVariable String stallCode) {
        return ResponseEntity.ok(stallService.checkAvailabilityByCode(stallCode));
    }
    
    // CHECK AVAILABILITY BY ID
    @GetMapping("/{id}/availability")
    public ResponseEntity<AvailabilityResponse> checkAvailabilityById(@PathVariable String id) {
        return ResponseEntity.ok(stallService.checkAvailabilityById(id));
    }
}