package com.bookfair.stallmanagement.repository;

import com.bookfair.stallmanagement.model.Stall;
import com.bookfair.stallmanagement.model.Stall.StallSize;
import com.bookfair.stallmanagement.model.Stall.StallStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StallRepository extends MongoRepository<Stall, String> {
    
    Optional<Stall> findByStallCode(String stallCode);
    
    List<Stall> findByStatus(StallStatus status);
    
    List<Stall> findBySize(StallSize size);
    
    List<Stall> findBySection(String section);
    
    List<Stall> findBySizeAndStatus(StallSize size, StallStatus status);
    
    List<Stall> findBySectionAndStatus(String section, StallStatus status);
    
    boolean existsByStallCode(String stallCode);
}