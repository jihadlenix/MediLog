package com.medilog.repository;

import com.medilog.model.LabResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabResultsRepository extends JpaRepository<LabResults, Long> {
}
