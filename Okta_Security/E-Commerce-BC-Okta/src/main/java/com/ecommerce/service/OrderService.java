package com.ecommerce.service;

import com.ecommerce.POJO.OrderHistoryReturnType;
import com.ecommerce.entity.Order;
import com.ecommerce.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;


    public OrderHistoryReturnType getAllOrdersByCustomerEmail(String email, int pageNumber, int pageSize){

        List<Order> orders = orderRepository.findAllByCustomerEmailOrderByDateCreatedDesc(email, PageRequest.of(pageNumber, pageSize)).getContent();
        long totalElements = orderRepository.findAllByCustomerEmailOrderByDateCreatedDesc(email, PageRequest.of(pageNumber, pageSize)).getTotalElements();


        return new OrderHistoryReturnType(orders, totalElements);
    }



}
