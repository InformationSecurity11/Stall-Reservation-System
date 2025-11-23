package com.bookfair.profile_management_service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Document(collection = "profiles") 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    @Id
    private String id; 

    private String userId; 
    private String fullName;
    private String email;
    private String phoneNumber;

    // Vendor Info
    private String companyName;
    private String businessRegNo;
    private String address;

    // Genres 
    private List<String> literaryGenres;

    private String role; 
}