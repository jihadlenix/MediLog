package com.medilog.medilog.controllers;

import com.medilog.medilog.models.Patient;
import com.medilog.medilog.models.Vaccine;
import com.medilog.medilog.repositories.PatientRepository;
import com.medilog.medilog.repositories.VaccineRepository;
//import com.medilog.medilog.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vaccines")
public class VaccineController {

    private final VaccineRepository vaccineRepository;
    private final PatientRepository patientRepository;

    public VaccineController(VaccineRepository vaccineRepository, PatientRepository patientRepository) {
        this.vaccineRepository = vaccineRepository;
        this.patientRepository = patientRepository;
    }

    // ✅ Get vaccines for authenticated patient
    @GetMapping("/patient")
    public ResponseEntity<?> getVaccinesByPatientToken(@RequestParam String token) {
        try {
            String username = JwtUtil.getUsernameFromToken(token);
            Optional<Patient> patientOpt = patientRepository.findByUsername(username);

            if (patientOpt.isPresent()) {
                String patientId = patientOpt.get().getId();
                List<Vaccine> vaccines = vaccineRepository.findByPatientId(patientId);
                return ResponseEntity.ok(vaccines);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }

    // ✅ Add a vaccine for the patient
    @PostMapping("/create")
    public ResponseEntity<?> createVaccineForPatient(@RequestParam String token, @RequestBody Vaccine vaccine) {
        try {
            String username = JwtUtil.getUsernameFromToken(token);
            Optional<Patient> patientOpt = patientRepository.findByUsername(username);

            if (patientOpt.isPresent()) {
                vaccine.setPatientId(patientOpt.get().getId());
                vaccine.setCreatedAt(new Date());
                Vaccine savedVaccine = vaccineRepository.save(vaccine);
                return ResponseEntity.ok(savedVaccine);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
    }

    // ✅ Update an existing vaccine
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVaccine(@PathVariable String id, @RequestBody Vaccine updatedVaccine) {
        return vaccineRepository.findById(id)
            .map(existing -> {
                existing.setVaccineName(updatedVaccine.getVaccineName());
                existing.setAdminDate(updatedVaccine.getAdminDate());
                existing.setDoctorName(updatedVaccine.getDoctorName());
                existing.setRecommendedAgeDose(updatedVaccine.getRecommendedAgeDose());
                return ResponseEntity.ok(vaccineRepository.save(existing));
            })
            .orElseThrow(() -> new RuntimeException("Vaccine not found"));
    }

    // ✅ Get by ID (optional)
    @GetMapping("/{id}")
    public Optional<Vaccine> getVaccineById(@PathVariable String id) {
        return vaccineRepository.findById(id);
    }

    // ✅ Delete a vaccine
    @DeleteMapping("/{id}")
    public void deleteVaccine(@PathVariable String id) {
        vaccineRepository.deleteById(id);
    }
}
