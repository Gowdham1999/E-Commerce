package com.ecommerce.controller;

import com.ecommerce.entity.State;
import com.ecommerce.service.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping("/states")
    public ResponseEntity<List<State>> getAllStates(){
        return new ResponseEntity<>(stateService.getAllStates(), HttpStatus.OK);
    }

    @GetMapping("/states/country/")
    public ResponseEntity<List<State>> getStatesByCountry(@RequestParam String code){
        return new ResponseEntity<>(stateService.getAllStatesByCountry(code), HttpStatus.OK);
    }

}
