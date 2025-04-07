package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "vaccines")
public class Vaccine {
    @Id
    private String id;

    private String patientId; // Reference to Patient
    private String vaccineName;
    private String recommendedAgeDose; // Example: "2 months / 1st"
    private Date adminDate;
    private String doctorName;

    private Date createdAt = new Date();
}
