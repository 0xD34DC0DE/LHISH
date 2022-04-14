package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.Template;
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
}
