package com.hardware.shop.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    private String name;
    private String contactInfo;
    private String companyName;

     @Column(nullable = true)
    private String email;
    
    @Column(nullable = true)
    private String address;   
    

        // One supplier has many products
        @OneToMany(mappedBy = "supplier")
        private java.util.List<Product> products;

    // Default constructor (required by JPA)
    public Supplier() {}

    // All-args constructor
    public Supplier(Long id, String name, String contactInfo, String companyName, String email, String address) {
        this.id = id;
        this.name = name;
        this.contactInfo = contactInfo;
        this.companyName = companyName;
        this.email = email != null && !email.isBlank() ? email : null;
        this.address = address;
    }

        public java.util.List<Product> getProducts() {
            return products;
        }

        public void setProducts(java.util.List<Product> products) {
            this.products = products;
        }

    // Getters & Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getContactInfo() {
        return contactInfo;
    }
    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }
    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
     public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
}
