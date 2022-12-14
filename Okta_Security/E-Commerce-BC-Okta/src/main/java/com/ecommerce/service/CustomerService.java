package com.ecommerce.service;

import com.ecommerce.POJO.PaymentInfo;
import com.ecommerce.POJO.PurchaseReturnData;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.Purchase;
import com.ecommerce.repository.CustomerRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Logger;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    private Logger logger = Logger.getLogger(getClass().getName());

    public CustomerService(@Value("${stripe.key.secret}") String secretKey) {
        Stripe.apiKey = secretKey;
    }


    @Transactional
//  Saving the Order to database. We receive the Json of type Purchase from the frontend
    public PurchaseReturnData saveOrderToDb(Purchase purchase) {

//  Selecting/Getting order from the JSON
        Order order = purchase.getOrder();

//  Generating random order id
        String orderIdGenerated = generateRandomOrderID();
        order.setOrderTrackingNumber(orderIdGenerated);

//  Setting order shipping address to the value from JSON as we have order and shipping entity relationship also enable data to be stored
        order.setShppingAddress(purchase.getShippingAddress());

//  Adding each order item to order as single order might have multiple order items
        purchase.getOrderItems().forEach(order::add);

//  Getting customer from the JSON
        Customer customer = purchase.getCustomer();

//  Checking if the email of the customer from UI already available in DB
        String email = customer.getEmail();
        Customer customerFromDB = customerRepository.findByEmail(email);

        if (customerFromDB != null) {
            customer = customerFromDB;
        }

//  Adding the above modified order to customer enitty
        customer.add(order);

//  Saving the customer to DB
        customerRepository.save(customer);

//  Returning the order id to be displayed in UI
        return new PurchaseReturnData(orderIdGenerated);
    }


    //  Random ID Generation
    private String generateRandomOrderID() {
        return UUID.randomUUID().toString();
    }


    //    STRIPE CODE BELOW
    public PaymentIntent paymentIntent(@NotNull PaymentInfo paymentInfo) throws StripeException {

        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("description", paymentInfo.getDescription());
        params.put("receipt_email", paymentInfo.getReceiptEmail());
        params.put("payment_method_types", paymentMethodTypes);

        logger.info("Params: "+params);

        return PaymentIntent.create(params);
    }

}
