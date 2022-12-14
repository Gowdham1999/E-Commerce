package com.ecommerce.service;

import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Purchase;
import com.ecommerce.entity.PurchaseReturnData;
import com.ecommerce.repository.PurchaseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Transactional
    public PurchaseReturnData saveOrderToDb(Purchase purchase){

        Order order = purchase.getOrder();

        String orderIdGenerated = generateRandomOrderID();
        order.setOrderTrackingNumber(orderIdGenerated);

        order.setShppingAddress(purchase.getShippingAddress());

        purchase.getOrderItems().forEach(order::add);

        Customer customer = purchase.getCustomer();
        customer.add(order);

        purchaseRepository.save(customer);

        return new PurchaseReturnData(orderIdGenerated);
    }

    private String generateRandomOrderID() {

        return UUID.randomUUID().toString();

    }

}
