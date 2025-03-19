package com.medilog.medilog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.medilog.medilog.models.AccessLink;

public interface AcessLinkRepository extends MongoRepository<AccessLink, String> {
}
