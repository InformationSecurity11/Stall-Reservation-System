package com.bookfair.profile_management_service.dto;

import lombok.Data;

@Data
public class RichProfileRequest {
    private String businessDescription;
    private String profileImageUrl;
    private String websiteUrl;
    private String facebookUrl;
}