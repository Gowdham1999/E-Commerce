package com.ecommerce.repository;

import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
//@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
//@CrossOrigin
public interface ProductCategoryRepository extends PagingAndSortingRepository<ProductCategory, Long> {
    public Page<ProductCategory> findFirstById(Long id, PageRequest pageRequest);

    public ProductCategory findAllById(Long id);

}
