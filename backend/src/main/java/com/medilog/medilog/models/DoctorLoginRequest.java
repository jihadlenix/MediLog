package com.medilog.medilog.models;

import lombok.Data;

@Data
public class DoctorLoginRequest {
    private String id;
    private String name;
    private String code;
    private String number; // or licenseNumber
    private String specialty;
}
