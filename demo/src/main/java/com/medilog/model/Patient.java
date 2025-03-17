package com.medilog.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    private String name;
    private LocalDate dateOfBirth;
    private String gender;
    private LocalDate createdAt;
    private String username;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<VisitSummary> visitSummaries;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Surgery> surgeries;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<Vaccine> vaccines;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    private List<AccessLink> accessLinks;

    // Getters and Setters
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<VisitSummary> getVisitSummaries() { return visitSummaries; }
    public void setVisitSummaries(List<VisitSummary> visitSummaries) { this.visitSummaries = visitSummaries; }

    public List<Surgery> getSurgeries() { return surgeries; }
    public void setSurgeries(List<Surgery> surgeries) { this.surgeries = surgeries; }

    public List<Vaccine> getVaccines() { return vaccines; }
    public void setVaccines(List<Vaccine> vaccines) { this.vaccines = vaccines; }

    public List<AccessLink> getAccessLinks() { return accessLinks; }
    public void setAccessLinks(List<AccessLink> accessLinks) { this.accessLinks = accessLinks; }
}
