package com.ecommerce.controller;


import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductsReturnType;
import com.ecommerce.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ProductsController {

    @Autowired
    private ProductsService productsService;

//    @GetMapping("/products")
//    public List<Product> getAll(){
//        return productsService.getAllProducts();
//    }


//    @GetMapping("/products")
//    public Page<Product> getAllWithPagination(@RequestParam String pageNumber, @RequestParam String pageSize){
//        return productsService.getAllProductsWithPagination(Integer.parseInt(pageNumber), Integer.parseInt(pageSize));
//    }

    @GetMapping("/products")
    public ResponseEntity<ProductsReturnType> getAllWithPagination(@RequestParam String pageNumber, @RequestParam String pageSize) {
        return new ResponseEntity(productsService.getAllProductsWithPagination(Integer.parseInt(pageNumber), Integer.parseInt(pageSize)), HttpStatus.OK);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id) {
        return productsService.getProductByID(id);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity<ProductsReturnType> getProductFromKeyword(@PathVariable String keyword, @RequestParam String pageNumber, @RequestParam String pageSize) {
        return new ResponseEntity(productsService.getProductsFromKeyword(keyword, Integer.parseInt(pageNumber), Integer.parseInt(pageSize)), HttpStatus.OK);
    }

}
