package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.Permission;
import dev.d34dc0de.lhish.repository.PermissionRepository;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PermissionService extends BaseService<Permission, PermissionRepository> {

    public PermissionService(PermissionRepository permissionRepository) {
        super(permissionRepository);
    }

    public Permission togglePermission(String id) {
        Permission permission = getById(id);
        permission.setStatus(!permission.getStatus());
        return repository.save(permission);
    }

    public Optional<Permission> findByName(String name) {
        Criteria criteria = Criteria.where("name").is(name);
        return repository.queryOne(criteria);
    }
    public Boolean getStatusByName(String name) {
        return findByName(name)
                .map(Permission::getStatus)
                .orElseThrow(() -> new NotFoundException("Permission", name));
    }
}
