package com.ecommerce.controller;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.service.ProductsCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ProductsCategoryController {

    @Autowired
    private ProductsCategoryService productsCategoryService;

    @GetMapping("/categories")
    public List<ProductCategory> getAllProductCategories(@RequestParam String pageNumber, @RequestParam String pageSize) {
        return productsCategoryService.getAllProductCategories(Integer.parseInt(pageNumber), Integer.parseInt(pageSize));
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<ProductCategory> getCategoryById(@PathVariable long id) {
        return productsCategoryService.getProductCategoryByID(id);
    }

    @GetMapping("/categories/{id}/products")
    public List<ProductCategory> getProductFromCategoryId(@PathVariable long id, @RequestParam String pageNumber, @RequestParam String pageSize) {
//        return new ResponseEntity(productsCategoryService.getProductsFromCategoryID(id, Integer.parseInt(pageNumber), Integer.parseInt(pageSize)), HttpStatus.OK);
        return productsCategoryService.getProductsFromCategoryID(id, Integer.parseInt(pageNumber), Integer.parseInt(pageSize));

    }

}
