package com.clinic.management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.clinic.management.model.Product;
import com.clinic.management.repository.ProductRepository;

@Service
@Transactional
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  public Product saveProduct(Product product) {
    return productRepository.save(product);
  }

  public Optional<Product> findById(Long id) {
    return productRepository.findById(id);
  }

  public List<Product> findAll() {
    return productRepository.findAll();
  }

  public Product updateProduct(Long id, Product productDetails) {
    Product product = productRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));
    product.setName(productDetails.getName());
    product.setPrice(productDetails.getPrice());
    return productRepository.save(product);
  }

  public void deleteProduct(Long id) {
    productRepository.deleteById(id);
  }
}
