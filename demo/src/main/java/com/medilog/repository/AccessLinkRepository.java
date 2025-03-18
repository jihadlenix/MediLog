package com.medilog.repository;

import com.medilog.model.AccessLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessLinkRepository extends JpaRepository<AccessLink, Long> {
}
