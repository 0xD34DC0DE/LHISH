package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.TemplateIdNamePairListView;
import dev.d34dc0de.lhish.view.ValueFieldView;
import dev.d34dc0de.lhish.view.view_factory.TemplateViewFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/template")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @PostMapping("/create")
    private ResponseEntity<String> createTemplate(@RequestBody TemplateCreationForm form) {
        return ResponseEntity.ok(
                templateService.insertTemplateFromForm(form).getId()
        );
    }

    @GetMapping("/all/ids")
    private ResponseEntity<TemplateIdNamePairListView> getAllNonInstanceIds() {
        return ResponseEntity.ok(
                TemplateViewFactory.toTemplateIdNamePairListView(templateService.findAllNonInstanceTemplate())
        );
    }

    @GetMapping("/{id}")
    private ResponseEntity<List<ValueFieldView>> getTemplateValueField(@PathVariable String id) {
        return ResponseEntity.ok(
                TemplateViewFactory.toTemplateView(templateService.getById(id)).valueFieldViews()
        );
    }

}
