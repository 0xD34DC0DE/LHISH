package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.form.model_factory.TemplateModelFactory;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.TemplateIdNamePairListView;
import dev.d34dc0de.lhish.view.TemplateIdView;
import dev.d34dc0de.lhish.view.view_factory.TemplateViewFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/template")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @PostMapping("/create")
    private ResponseEntity<TemplateIdView> createTemplate(@RequestBody TemplateCreationForm form) {
        return ResponseEntity.ok(new TemplateIdView(templateService.insert(TemplateModelFactory.toModel(form)).getId()));
    }

    @GetMapping("/all/ids")
    private ResponseEntity<TemplateIdNamePairListView> getAllIds() {
        return ResponseEntity.ok(
                TemplateViewFactory.toTemplateIdNamePairListView(templateService.findAllTemplate())
        );
    }

}
