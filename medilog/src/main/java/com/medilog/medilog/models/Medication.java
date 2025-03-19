package com.medilog.medilog.models;

import lombok.Data;
import java.util.Date;

@Data
public class Medication {
    private String medicationName;
    private String dosage;
    private Date givenDate;
    private Date dueDate;
    private String description;
    private String status;
}
