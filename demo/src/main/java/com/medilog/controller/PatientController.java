package com.medilog.controller;

import com.medilog.model.Patient;
import com.medilog.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping("/")
    public List<Patient> getAllPatients() {
        return patientService.findAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.findPatientById(id)
                .map(patient -> ResponseEntity.ok(patient))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        return patientService.findPatientById(id)
                .map(patient -> {
                    patient.setName(patientDetails.getName());
                    patient.setDateOfBirth(patientDetails.getDateOfBirth());
                    patient.setGender(patientDetails.getGender());
                    patient.setUsername(patientDetails.getUsername());
                    Patient updatedPatient = patientService.savePatient(patient);
                    return ResponseEntity.ok(updatedPatient);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        return patientService.findPatientById(id)
                .map(patient -> {
                    patientService.deletePatient(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
