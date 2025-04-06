package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "doctors")
public class Doctor {
    @Id
    private String id; // Proper unique ID

    private String verificationToken;
    private String email;
    private boolean isEmailVerified = false;

    private String name;
    private String code;
    private String licenseNumber;
    private String specialty;

    private Date createdAt = new Date();
}
