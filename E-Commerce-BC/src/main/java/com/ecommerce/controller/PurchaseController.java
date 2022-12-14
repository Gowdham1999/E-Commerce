package com.ecommerce.controller;

import com.ecommerce.entity.Purchase;
import com.ecommerce.entity.PurchaseReturnData;
import com.ecommerce.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping("/purchase")
    public PurchaseReturnData saveOrderToDb(@RequestBody Purchase purchase){
        return purchaseService.saveOrderToDb(purchase);
    }

}
