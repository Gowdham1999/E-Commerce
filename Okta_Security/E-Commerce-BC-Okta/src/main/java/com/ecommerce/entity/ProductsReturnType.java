package com.ecommerce.entity;

import java.util.List;

public class ProductsReturnType {

    private List<Product> products;
    private long totalDataCount;

    public ProductsReturnType(List<Product> products, long totalDataCount) {
        this.products = products;
        this.totalDataCount = totalDataCount;
    }

    public ProductsReturnType() {
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public long getTotalDataCount() {
        return totalDataCount;
    }

    public void setTotalDataCount(int totalDataCount) {
        this.totalDataCount = totalDataCount;
    }
}
