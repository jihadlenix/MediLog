package com.medilog.medilog.models;

import lombok.Data;

@Data
public class PatientLoginRequest {
    private String username;
    private String password;
}
