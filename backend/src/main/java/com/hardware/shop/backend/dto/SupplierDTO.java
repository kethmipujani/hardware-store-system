package com.hardware.shop.backend.dto;

public class SupplierDTO {
    private Long id;
    private String name;
    private String contactInfo;
    private String companyName;
    private String email;
    private String address;

    public SupplierDTO() {}

    public SupplierDTO(Long id, String name, String contactInfo, String companyName, String email, String address) {
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
        this.companyName = companyName;
        this.email = email;
        this.address = address;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getContactInfo() { return contactInfo; }
    public void setContactInfo(String contactInfo) { this.contactInfo = contactInfo; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
