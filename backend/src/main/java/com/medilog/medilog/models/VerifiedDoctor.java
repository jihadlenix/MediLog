package com.medilog.medilog.models;

public class VerifiedDoctor {
    private String name;
    private String code;
    private String number;
    private String specialty;

    // Constructor
    public VerifiedDoctor(String name, String code, String number, String specialty) {
        this.name = name;
        this.code = code;
        this.number = number;
        this.specialty = specialty;
    }

    // Getters
    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public String getNumber() {
        return number;
    }

    public String getSpecialty() {
        return specialty;
    }

    // Optional: toString for logging/debugging
    @Override
    public String toString() {
        return "VerifiedDoctor{" +
                "name='" + name + '\'' +
                ", code='" + code + '\'' +
                ", number='" + number + '\'' +
                ", specialty='" + specialty + '\'' +
                '}';
    }
}
