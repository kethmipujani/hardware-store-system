package com.hardware.shop.backend.service;

import com.hardware.shop.backend.model.SaleItem;
import com.hardware.shop.backend.repository.SaleItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SaleItemService {
    @Autowired
    private SaleItemRepository saleItemRepository;

    public List<SaleItem> getAllSaleItems() {
        return saleItemRepository.findAll();
    }

    public Optional<SaleItem> getSaleItemById(Long id) {
        return saleItemRepository.findById(id);
    }

    public SaleItem saveSaleItem(SaleItem saleItem) {
        return saleItemRepository.save(saleItem);
    }

    public void deleteSaleItem(Long id) {
        saleItemRepository.deleteById(id);
    }
}
