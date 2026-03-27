package com.hardware.shop.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment primary key
    private Long id;

    private String name;

        // One category has many products
        @OneToMany(mappedBy = "category")
        private java.util.List<Product> products;

    // Default constructor required by JPA
    public Category() {}

    // Constructor with fields (optional)
    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
    }

        public java.util.List<Product> getProducts() {
            return products;
        }

        public void setProducts(java.util.List<Product> products) {
            this.products = products;
        }

    // Getters and setters

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
}
