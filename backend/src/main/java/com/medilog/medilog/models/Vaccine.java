package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "vaccines")
public class Vaccine {
    @Id
    private String id; // This should be the @Id

    private String patientId; // Reference to Patient
    private String vaccineName;
    private String doctorName; // <- Now it's correctly added
    private Date adminDate;
    private Date createdAt = new Date();
}
