package com.medilog.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "surgeries")
public class Surgeries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long surgeryId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    private String surgeryType;
    private LocalDate surgeryDate;
    private String description;
    private String status;  // 'upcoming' or 'past'
    private LocalDate createdAt;

    // Getters and Setters
    public Long getSurgeryId() {
        return surgeryId;
    }

    public Patient getPatient() {
        return patient;
    }

    public String getSurgeryType() {
        return surgeryType;
    }

    public LocalDate getSurgeryDate() {
        return surgeryDate;
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

    public void setSurgeryId(Long surgeryId) {
        this.surgeryId = surgeryId;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public void setSurgeryType(String surgeryType) {
        this.surgeryType = surgeryType;
    }

    public void setSurgeryDate(LocalDate surgeryDate) {
        this.surgeryDate = surgeryDate;
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
