package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.model.ViewFields.ValueField;
import dev.d34dc0de.lhish.repository.TemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    private final ValueFieldService valueFieldService;

    public TemplateService(TemplateRepository templateRepository,
                           ValueFieldService valueFieldService) {
        this.templateRepository = templateRepository;
        this.valueFieldService = valueFieldService;
    }

    public Optional<Template> findById(String templateId) {
        return templateRepository.findById(templateId);
    }

    public Template getById(String templateId) {
        return findById(templateId).orElseThrow(() -> new NotFoundException("Template", templateId));
    }

    public List<ValueField> getValueFields(Template template) {
        return template.getValueFieldsIds().stream()
                .map(valueFieldService::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .toList();

    }

    public Template insert(Template template) {
        return templateRepository.insert(template);
    }
}
