package com.medilog.repository;

import com.medilog.model.VisitSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitSummaryRepository extends JpaRepository<VisitSummary, Long> {
}
