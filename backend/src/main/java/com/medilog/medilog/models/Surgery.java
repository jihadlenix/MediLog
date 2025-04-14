package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "surgeries")
public class Surgery {
    @Id
    private String id;
    private String patientId; // Reference to Patient
    private String surgeryType;
    private String description;
    private String status;
    private Date createdAt = new Date();
}
