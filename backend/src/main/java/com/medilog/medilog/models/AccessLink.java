package com.medilog.medilog.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "access_links")
public class AccessLink {
    @Id
    private String id;
    private String patientId;
    private String doctorId;
    private String patientName;
    private String token; // Secure access token
    private Date expiryTime;
    private boolean isActive;
    private Date createdAt = new Date();
}
