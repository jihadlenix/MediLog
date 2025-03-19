package com.medilog.medilog.models;

import lombok.Data;
import java.util.Date;

@Data
public class LabResult {
    private String healthMetrics;
    private Date createdAt = new Date();
}
