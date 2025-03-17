package com.medilog.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")  // Root URL mapping
public class HomeController {

    @GetMapping
    public String helloWorld() {
        return "Hello, World!";
    }
}
