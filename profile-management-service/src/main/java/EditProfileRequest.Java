package com.yourcompany.profile.dto;

public class EditProfileRequest {
    private String businessName;
    private String contactPerson;
    private String phoneNumber;

    // Standard Getters and Setters (omitted for brevity)
    // ...

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
}