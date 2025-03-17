package com.medilog.repository;

import com.medilog.model.Surgery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurgeriesRepository extends JpaRepository<Surgery, Long> {
}
