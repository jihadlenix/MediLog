package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "medications")
public class Medication {
    @Id
    private String id;
    private String patientId;
    private String doctorName;
    private String visitSummaryId; // Reference to VisitSummary
    private String medicationName;
    private String target;
    private String dosage;
    private Date givenDate;
    private Date dueDate;
    private String description;
    private String status;
    private boolean isCurrent = false; // Explicitly initialized to false
    private Date createdAt = new Date();
}