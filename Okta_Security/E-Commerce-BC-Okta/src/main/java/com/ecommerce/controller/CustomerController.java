package com.ecommerce.controller;

import com.ecommerce.POJO.PaymentInfo;
import com.ecommerce.entity.Purchase;
import com.ecommerce.POJO.PurchaseReturnData;
import com.ecommerce.service.CustomerService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@CrossOrigin
@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    private Logger logger = Logger.getLogger(getClass().getName());


    @PostMapping("/purchase")
    public PurchaseReturnData saveOrderToDb(@RequestBody Purchase purchase){
        return customerService.saveOrderToDb(purchase);
    }


//    STRIPE CODE
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException{

        logger.info("Payment :---->" + paymentInfo.getAmount());

        PaymentIntent paymentIntent = customerService.paymentIntent(paymentInfo);

        String paymentString = paymentIntent.toJson();

        return new ResponseEntity<>(paymentString, HttpStatus.OK);

    }

}
