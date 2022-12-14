package com.ecommerce.POJO;

import com.ecommerce.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
public class OrderHistoryReturnType {

    private List<Order> orders;

    private long totalElements;

}
