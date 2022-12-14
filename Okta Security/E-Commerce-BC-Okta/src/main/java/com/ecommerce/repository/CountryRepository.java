package com.ecommerce.repository;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country,Long> {

    Country findAllByName(String code);

}
