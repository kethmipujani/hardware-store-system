package com.hardware.shop.backend.controller;

import com.hardware.shop.backend.model.SaleItem;
import com.hardware.shop.backend.repository.SaleItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/sale-items")
public class SaleItemController {
    @Autowired
    private SaleItemRepository saleItemRepository;

    @GetMapping
    public List<SaleItem> getAllSaleItems() {
        return saleItemRepository.findAll();
    }

    @GetMapping("/{id}")
    public SaleItem getSaleItemById(@PathVariable Long id) {
        return saleItemRepository.findById(id).orElse(null);
    }

    @PostMapping
    public SaleItem createSaleItem(@RequestBody SaleItem saleItem) {
        return saleItemRepository.save(saleItem);
    }

    @PutMapping("/{id}")
    public SaleItem updateSaleItem(@PathVariable Long id, @RequestBody SaleItem saleItem) {
        saleItem.setId(id);
        return saleItemRepository.save(saleItem);
    }

    @DeleteMapping("/{id}")
    public void deleteSaleItem(@PathVariable Long id) {
        saleItemRepository.deleteById(id);
    }
}
