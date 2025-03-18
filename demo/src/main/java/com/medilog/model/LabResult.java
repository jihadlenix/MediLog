package com.medilog.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class LabResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "summary_id", nullable = false)
    private VisitSummary visitSummary;

    private String healthMetrics;
    private LocalDate createdAt;

    // Getters and Setters
    public Long getResultId() { return resultId; }
    public void setResultId(Long resultId) { this.resultId = resultId; }

    public VisitSummary getVisitSummary() { return visitSummary; }
    public void setVisitSummary(VisitSummary visitSummary) { this.visitSummary = visitSummary; }

    public String getHealthMetrics() { return healthMetrics; }
    public void setHealthMetrics(String healthMetrics) { this.healthMetrics = healthMetrics; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }
}
