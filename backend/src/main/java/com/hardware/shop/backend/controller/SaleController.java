package com.hardware.shop.backend.controller;

import com.hardware.shop.backend.model.Sale;
import com.hardware.shop.backend.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/sales")
public class SaleController {
    @Autowired
    private SaleRepository saleRepository;

    @GetMapping
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    @GetMapping("/{id}")
    public Sale getSaleById(@PathVariable Long id) {
        return saleRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Sale createSale(@RequestBody Sale sale) {
        return saleRepository.save(sale);
    }

    @PutMapping("/{id}")
    public Sale updateSale(@PathVariable Long id, @RequestBody Sale sale) {
        sale.setSaleId(id);
        return saleRepository.save(sale);
    }

    @DeleteMapping("/{id}")
    public void deleteSale(@PathVariable Long id) {
        saleRepository.deleteById(id);
    }
}
