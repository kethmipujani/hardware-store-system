package com.hardware.shop.backend.controller;

import com.hardware.shop.backend.model.Supplier;
import com.hardware.shop.backend.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend requests
public class SupplierController {

    @Autowired
    private SupplierRepository supplierRepository;

    // Get all suppliers
    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    // Get supplier by ID
    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier not found"));
    }

    // Create supplier
    @PostMapping
    public Supplier createSupplier(@RequestBody Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    // Update supplier
    @PutMapping("/{id}")
    public Supplier updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
        Supplier existing = supplierRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier not found"));

        existing.setName(supplier.getName());
        existing.setContactInfo(supplier.getContactInfo());
        existing.setCompanyName(supplier.getCompanyName());
        existing.setEmail(supplier.getEmail());

        return supplierRepository.save(existing);
    }

    // Delete supplier
    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable Long id) {
        if (!supplierRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier not found");
        }
        supplierRepository.deleteById(id);
    }
}
