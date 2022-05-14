package dev.d34dc0de.lhish.apprunner;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.d34dc0de.lhish.model.Permission;
import dev.d34dc0de.lhish.service.PermissionService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PermissionRegistration implements ApplicationRunner {

    private static final String PERMISSIONS_JSON_FILEPATH = "classpath:permissions.json";

    private final PermissionService permissionService;

    private final ResourceLoader resourceLoader;

    public PermissionRegistration(PermissionService permissionService, ResourceLoader resourceLoader) {
        this.permissionService = permissionService;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource permissionListResource = resourceLoader.getResource(PERMISSIONS_JSON_FILEPATH);
        ObjectMapper objectMapper = new ObjectMapper();
        String[] permissionNames = objectMapper.readValue(permissionListResource.getInputStream(), String[].class);

        for (String permissionName : permissionNames) {
            Optional<Permission> permissionOptional = permissionService.findByName(permissionName);

            if (permissionOptional.isEmpty()) {
                Permission permission = Permission.builder()
                        .name(permissionName)
                        .status(false)
                        .build();
                permissionService.save(permission);
            }
        }
    }
}
