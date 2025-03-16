package com.medilog.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "medications")
public class Medications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicationId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "summary_id", nullable = false)
    private VisitSummary summary;
    private String medicationName;
    private String dosage;
    private LocalDate givenDate;
    private LocalDate dueDate;
    private String description;
    private String status;  // 'current' or 'past'
    private LocalDate createdAt;

    // Getters and Setters
    public Long getMedicationId() {
        return medicationId;
    }

    public VisitSummary getSummary() {
        return summary;
    }

    public String getMedicationName() {
        return medicationName;
    }

    public String getDosage() {
        return dosage;
    }

    public LocalDate getGivenDate() {
        return givenDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setMedicationId(Long medicationId) {
        this.medicationId = medicationId;
    }

    public void setSummary(VisitSummary summary) {
        this.summary = summary;
    }

    public void setMedicationName(String medicationName) {
        this.medicationName = medicationName;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public void setGivenDate(LocalDate givenDate) {
        this.givenDate = givenDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
