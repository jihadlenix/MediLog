package com.medilog.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "visit_summary")
public class VisitSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long summaryId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    private String visitType;
    private LocalDateTime visitDate;
    private String description;
    private String doctorName;
    private String diagnosis;
    private String testsRequired;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "summary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Medications> medications;

    @OneToMany(mappedBy = "summary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LabResults> labResults;

    // Getters
    public Long getSummaryId() {
        return summaryId;
    }

    public Patient getPatient() {
        return patient;
    }

    public String getVisitType() {
        return visitType;
    }

    public LocalDateTime getVisitDate() {
        return visitDate;
    }

    public String getDescription() {
        return description;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public String getTestsRequired() {
        return testsRequired;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<Medications> getMedications() {
        return medications;
    }

    public List<LabResults> getLabResults() {
        return labResults;
    }

    // Setters
    public void setSummaryId(Long summaryId) {
        this.summaryId = summaryId;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setVisitType(String visitType) {
        this.visitType = visitType;
    }

    public void setVisitDate(LocalDateTime visitDate) {
        this.visitDate = visitDate;
    }
}
