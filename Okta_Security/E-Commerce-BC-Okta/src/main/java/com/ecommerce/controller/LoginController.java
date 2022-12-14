package com.ecommerce.controller;

import com.ecommerce.entity.Login;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class LoginController {

    @GetMapping("/auth")
    public Login isAuthenticated(){
        return new Login("Authenticated");
    }

}
