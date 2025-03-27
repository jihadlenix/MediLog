package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "lab_results")
public class LabResult {
    @Id
    private String id;
    private String visitSummaryId; // Reference to VisitSummary
    private String healthMetrics;
    private Date createdAt = new Date();
}
