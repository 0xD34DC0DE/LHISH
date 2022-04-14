package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.form.model_factory.TemplateModelFactory;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.model.ViewFields.ValueField;
import dev.d34dc0de.lhish.repository.TemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public Template insert(Template template) {
        return templateRepository.insert(template);
    }

    public Optional<Template> findById(String templateId) {
        return templateRepository.findById(templateId);
    }

    public Template getById(String templateId) {
        return findById(templateId).orElseThrow(() -> new NotFoundException("Template", templateId));
    }

    public List<Template> findAllTemplate() {
        return templateRepository.findAllByIsInstanceFalse();
    }

    public Template insertTemplateFromForm(TemplateCreationForm templateCreationForm) {
        if (templateCreationForm.isNewTemplate()) {
            insertNonInstanceTemplate(templateCreationForm);
        }
        return insert(TemplateModelFactory.toModel(templateCreationForm, true));
    }

    private void insertNonInstanceTemplate(TemplateCreationForm templateCreationForm) {
        List<ValueField> templateFields = templateCreationForm.fields().stream()
                .peek(valueField -> valueField.setValue(null))
                .toList();
        TemplateCreationForm templateOnly = TemplateCreationForm.builder()
                .name(templateCreationForm.name())
                .fields(templateFields)
                .build();
        insert(TemplateModelFactory.toModel(templateOnly, false));
    }
}
