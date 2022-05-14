package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.PermissionToggleForm;
import dev.d34dc0de.lhish.model.Permission;
import dev.d34dc0de.lhish.service.PermissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permission")
public class PermissionController extends BaseController {

    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping("/all")
    private ResponseEntity<List<Permission>> getAllPermissions() {
        return ok(permissionService.getAll());
    }

    @PostMapping("/toggle")
    private ResponseEntity<Permission> togglePermission(@RequestBody PermissionToggleForm form) {
        return ok(permissionService.togglePermission(form.id()));
    }

    @GetMapping("/name/{name}")
    private ResponseEntity<Boolean> getPermissionStatusByName(@PathVariable("name") String name) {
        return ok(permissionService.getStatusByName(name));
    }
}
