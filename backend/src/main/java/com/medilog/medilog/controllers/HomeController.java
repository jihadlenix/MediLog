package com.medilog.medilog.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "✅ MediLog Backend is running! Use /api/patients/login or /signup to get started.";
    }
}
