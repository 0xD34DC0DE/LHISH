package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.DBMetricsView;
import dev.d34dc0de.lhish.view.TemplateIdNamePairListView;
import dev.d34dc0de.lhish.view.TemplateView;
import dev.d34dc0de.lhish.view.ValueFieldView;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/template")
public class TemplateController extends BaseController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @PostMapping("/create")
    private ResponseEntity<String> createTemplate(@RequestBody TemplateCreationForm form) {
        return ok(templateService.insertTemplateFromForm(form).getId());
    }

    @GetMapping("/all/ids")
    private ResponseEntity<TemplateIdNamePairListView> getAllNonInstanceIds() {
        return ok(mapFromList(templateService.findAllNonInstanceTemplate(), TemplateIdNamePairListView.class));
    }

    @GetMapping("/{id}")
    private ResponseEntity<List<ValueFieldView>> getTemplateValueField(@PathVariable String id) {
        return ok(map(templateService.getById(id), TemplateView.class).valueFieldViews());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/metrics")
    private ResponseEntity<DBMetricsView> getMetrics() {
        return ok(map(templateService.getMetrics(), DBMetricsView.class));
    }

}
