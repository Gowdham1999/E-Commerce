package com.ecommerce.POJO;

import lombok.Data;

@Data
public class PaymentInfo {

    private int amount;
    private String currency;
    private String description;
    private String receiptEmail;

}
