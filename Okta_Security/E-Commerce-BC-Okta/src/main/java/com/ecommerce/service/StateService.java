package com.ecommerce.service;

import com.ecommerce.entity.State;
import com.ecommerce.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;


    public List<State> getAllStates(){
        return stateRepository.findAll();
    }

    public List<State> getAllStatesByCountry(String code){
        return stateRepository.findByCountry_Id(code);
    }

}
