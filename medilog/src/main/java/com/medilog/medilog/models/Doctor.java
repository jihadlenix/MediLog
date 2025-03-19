package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "doctors")
public class Doctor {
    @Id
    private String id;
    private String name;
    private String specialty;
    private String licenseNumber;
    private Date createdAt = new Date();
}
