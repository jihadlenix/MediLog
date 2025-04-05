package com.medilog.medilog.controllers;


import com.medilog.medilog.models.Doctor;
import com.medilog.medilog.models.VerifiedDoctorList;
import com.medilog.medilog.repositories.DoctorRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }
    

    @GetMapping("/{id}")
    public Optional<Doctor> getDoctorById(@PathVariable String id) {
        return doctorRepository.findById(id);
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable String id, @RequestBody Doctor updatedDoctor) {
        return doctorRepository.findById(id)
                .map(doctor -> {
                    doctor.setName(updatedDoctor.getName());
                    doctor.setSpecialty(updatedDoctor.getSpecialty());
                    doctor.setLicenseNumber(updatedDoctor.getLicenseNumber());
                    return doctorRepository.save(doctor);
                })
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable String id) {
        doctorRepository.deleteById(id);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginDoctor(@RequestBody Doctor doctorLogin) {
        // Check email is verified
        Optional<Doctor> doctor = doctorRepository.findByEmail(doctorLogin.getEmail());
        if (doctor.isEmpty() || !doctor.get().isEmailVerified()) {
            return ResponseEntity.status(403).body("Please verify your email first.");
        }
    
        return VerifiedDoctorList.VERIFIED_DOCTORS.stream()
            .filter(doc ->
                doc.getName().equalsIgnoreCase(doctorLogin.getName()) &&
                doc.getCode().equals(doctorLogin.getCode()) &&
                doc.getNumber().equals(doctorLogin.getLicenseNumber()) &&
                doc.getSpecialty().equalsIgnoreCase(doctorLogin.getSpecialty())
            )
            .findFirst()
            .map(doc -> ResponseEntity.ok("✅ Login successful. Welcome, Doctor " + doc.getName()))
            .orElse(ResponseEntity.status(401).body("❌ You are not a verified doctor."));
    }
    

}
