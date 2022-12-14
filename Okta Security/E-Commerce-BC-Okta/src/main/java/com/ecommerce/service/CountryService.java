package com.ecommerce.service;

import com.ecommerce.entity.Country;
import com.ecommerce.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {
    @Autowired
    private CountryRepository countryRepository;


    public List<Country> getAllCountries(){
        return countryRepository.findAll();
    }

    public Country getCountryById(long id){
        return countryRepository.findById(id).get();
    }

    public Country getCountryFromCode(String code){
        return countryRepository.findAllByName(code);
    }

}
