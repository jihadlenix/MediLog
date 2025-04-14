package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date; // Required import

@Data
@Document(collection = "verification_tokens")
public class VerificationToken {
    @Id
    private String id;
    private String token;
    private String patientId;
    private Date expiryDate;
}
