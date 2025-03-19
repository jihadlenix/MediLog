package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "visit_summaries")
public class VisitSummary {
    @Id
    private String id;
    private String patientId; // Reference to Patient
    private String visitType;
    private Date visitDate;
    private String description;
    private String doctorName;
    private String diagnosis;
    private List<String> testsRequired; // List of test names
    private Date createdAt = new Date();

    private List<Medication> medications; // Embedded List
    private List<LabResult> labResults; // Embedded List
}
