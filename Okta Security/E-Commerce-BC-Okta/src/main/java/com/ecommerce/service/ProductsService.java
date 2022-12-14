package com.ecommerce.service;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductsReturnType;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductsService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductsReturnType getAllProductsWithPagination(int pageNumber, int pageSize) {

        List<Product> products = productRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();

        long totalElements = productRepository.findAll(PageRequest.of(pageNumber, pageSize)).getTotalElements();

        return new ProductsReturnType(products, totalElements);
    }

    public ProductsReturnType getProductsFromKeyword(String name, int pageNumber, int pageSize) {

        Page<Product> productsPage = productRepository.findAllByNameContaining(name, PageRequest.of(pageNumber, pageSize));

        List<Product> productsFromSearch = productsPage.getContent();
        long totalElements = productsPage.getTotalElements();

        return new ProductsReturnType(productsFromSearch, totalElements);
    }

    public ResponseEntity<Product> getProductByID(Long id) {

        if(productRepository.findById(id) != null){
            return new ResponseEntity(productRepository.findById(id), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
