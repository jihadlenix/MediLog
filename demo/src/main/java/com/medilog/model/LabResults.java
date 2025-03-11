package com.medilog.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lab_results")
public class LabResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "summary_id", nullable = false)
    private VisitSummary summary;
    private String healthMetrics;  // Consider using a custom type or Map for JSON handling
    private LocalDateTime createdAt;

    // Getters and Setters
    public Long getResultId() {
        return resultId;
    }

    public VisitSummary getSummary() {
        return summary;
    }

    public String getHealthMetrics() {
        return healthMetrics;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setResultId(Long resultId) {
        this.resultId = resultId;
    }

    public void setSummary(VisitSummary summary) {
        this.summary = summary;
    }

    public void setHealthMetrics(String healthMetrics) {
        this.healthMetrics = healthMetrics;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
