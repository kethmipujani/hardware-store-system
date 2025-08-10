package com.hardware.shop.backend.repository;

import com.hardware.shop.backend.model.SaleItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
}
