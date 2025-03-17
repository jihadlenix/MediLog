package com.medilog.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class VisitSummary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long summaryId;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    private String visitType;
    private LocalDate visitDate;
    private String description;
    private String doctorName;
    private String diagnosis;
    private String testsRequired;
    private LocalDate createdAt;

    @OneToMany(mappedBy = "visitSummary", cascade = CascadeType.ALL)
    private List<LabResult> labResults;

    @OneToMany(mappedBy = "visitSummary", cascade = CascadeType.ALL)
    private List<Medication> medications;

    // Getters and Setters
    public Long getSummaryId() { return summaryId; }
    public void setSummaryId(Long summaryId) { this.summaryId = summaryId; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public String getVisitType() { return visitType; }
    public void setVisitType(String visitType) { this.visitType = visitType; }

    public LocalDate getVisitDate() { return visitDate; }
    public void setVisitDate(LocalDate visitDate) { this.visitDate = visitDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getTestsRequired() { return testsRequired; }
    public void setTestsRequired(String testsRequired) { this.testsRequired = testsRequired; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }

    public List<LabResult> getLabResults() { return labResults; }
    public void setLabResults(List<LabResult> labResults) { this.labResults = labResults; }

    public List<Medication> getMedications() { return medications; }
    public void setMedications(List<Medication> medications) { this.medications = medications; }
}
