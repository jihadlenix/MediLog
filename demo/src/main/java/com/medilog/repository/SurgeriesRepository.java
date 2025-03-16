package com.medilog.repository;

import com.medilog.model.Surgeries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurgeriesRepository extends JpaRepository<Surgeries, Long> {
}
