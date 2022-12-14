package com.ecommerce.service;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.entity.ProductsReturnType;
import com.ecommerce.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    public List<ProductCategory> getAllProductCategories(int pageNumber, int pageSize) {

        List<ProductCategory> categories = productCategoryRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();

        return categories;
    }

    public ResponseEntity<ProductCategory> getProductCategoryByID(Long id) {

        if (productCategoryRepository.findAllById(id) != null) {
            return new ResponseEntity(productCategoryRepository.findAllById(id), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

    public List<ProductCategory> getProductsFromCategoryID(Long id, int pageNumber, int pageSize) {

        List<ProductCategory> productsFromCategory = productCategoryRepository.findFirstById(id, PageRequest.of(pageNumber, pageSize)).getContent();

        return productsFromCategory;

    }

}
