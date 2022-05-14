package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.model.ValueField;
import dev.d34dc0de.lhish.repository.TemplateRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemplateService extends BaseService<Template, TemplateRepository> {

    private final MapperService mapperService;

    public TemplateService(TemplateRepository templateRepository, @Lazy MapperService mapperService) {
        super(templateRepository);
        this.mapperService = mapperService;
    }

    public List<Template> findAllNonInstanceTemplate() {
        Criteria criteria = Criteria.where("isInstance").is(false);
        return repository.queryMultiple(criteria);
    }

    public Template insertTemplateFromForm(TemplateCreationForm templateCreationForm) {
        if (templateCreationForm.getIsNewTemplate()) {
            insertNonInstanceTemplate(new TemplateCreationForm(templateCreationForm));
        }
        return save(mapperService.map(templateCreationForm, Template.class, "instance"));
    }

    private void insertNonInstanceTemplate(TemplateCreationForm templateCreationForm) {
        List<ValueField> templateFields = getValueFieldsWithoutValues(templateCreationForm);
        TemplateCreationForm templateOnly = TemplateCreationForm.builder()
                .name(templateCreationForm.getName())
                .fields(templateFields)
                .build();
        save(mapperService.map(templateOnly, Template.class, "non-instance"));
    }

    private List<ValueField> getValueFieldsWithoutValues(TemplateCreationForm templateCreationForm) {
        return templateCreationForm.getFields().stream()
                .peek(valueField -> valueField.getValues().replace("value", null))
                .toList();
    }
}
