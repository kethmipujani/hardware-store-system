package com.hardware.shop.backend.repository;

import com.hardware.shop.backend.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {
}
