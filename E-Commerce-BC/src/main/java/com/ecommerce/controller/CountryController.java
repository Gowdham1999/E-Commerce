package com.ecommerce.controller;

import com.ecommerce.entity.Country;
import com.ecommerce.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping("/countries")
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/country")
    public Country getCountryFromCode(@RequestParam String code) {
        return countryService.getCountryFromCode(code);
    }

    @GetMapping("countries/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable long id) {

        if (countryService.getCountryById(id) != null) {
            return new ResponseEntity<>(countryService.getCountryById(id), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
