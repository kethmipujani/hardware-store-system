package com.hardware.shop.backend.repository;

import com.hardware.shop.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
