package com.medilog.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicationId;

    @ManyToOne
    @JoinColumn(name = "summary_id", nullable = false)
    private VisitSummary visitSummary;

    private String medicationName;
    private String dosage;
    private LocalDate givenDate;
    private LocalDate dueDate;
    private String description;
    private String status;
    private LocalDate createdAt;

    // Getters and Setters
    public Long getMedicationId() { return medicationId; }
    public void setMedicationId(Long medicationId) { this.medicationId = medicationId; }

    public VisitSummary getVisitSummary() { return visitSummary; }
    public void setVisitSummary(VisitSummary visitSummary) { this.visitSummary = visitSummary; }

    public String getMedicationName() { return medicationName; }
    public void setMedicationName(String medicationName) { this.medicationName = medicationName; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public LocalDate getGivenDate() { return givenDate; }
    public void setGivenDate(LocalDate givenDate) { this.givenDate = givenDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
}
