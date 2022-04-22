package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.form.model_factory.TemplateModelFactory;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.model.ValueField;
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

    public void deleteById(String id) {
        templateRepository.deleteById(id);
    }

    public List<Template> findAllNonInstanceTemplate() {
        return templateRepository.findAllByIsInstanceFalse();
    }

    public Template insertTemplateFromForm(TemplateCreationForm templateCreationForm) {
        if (templateCreationForm.isNewTemplate()) {
            insertNonInstanceTemplate(templateCreationForm);
        }
        return insert(TemplateModelFactory.toInstanceTemplateModel(templateCreationForm));
    }

    private void insertNonInstanceTemplate(TemplateCreationForm templateCreationForm) {
        List<ValueField> templateFields = getValueFieldsWithoutValues(templateCreationForm);
        TemplateCreationForm templateOnly = TemplateCreationForm.builder()
                .name(templateCreationForm.name())
                .fields(templateFields)
                .build();
        insert(TemplateModelFactory.toNonInstanceTemplateModel(templateOnly));
    }

    private List<ValueField> getValueFieldsWithoutValues(TemplateCreationForm templateCreationForm) {
        return templateCreationForm.fields().stream()
                .peek(valueField -> {
                    if(valueField.getValues().containsKey("value")) {
                        valueField.getValues().replace("value", null);
                    }
                })
                .toList();
    }
}
