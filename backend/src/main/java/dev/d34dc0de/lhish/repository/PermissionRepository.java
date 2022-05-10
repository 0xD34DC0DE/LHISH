package dev.d34dc0de.lhish.repository;

import dev.d34dc0de.lhish.model.Permission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends BaseRepository<Permission> {
}
