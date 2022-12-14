package com.ecommerce.controller;

import com.ecommerce.POJO.OrderHistoryReturnType;
import com.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/orders/orderhistory")
    public ResponseEntity<OrderHistoryReturnType> getAllCustomerByEmail(@RequestParam String email, @RequestParam String pageNumber, @RequestParam String pageSize){
        return new ResponseEntity<>(orderService.getAllOrdersByCustomerEmail(email, Integer.parseInt(pageNumber), Integer.parseInt(pageSize)), HttpStatus.OK);
    }

}
