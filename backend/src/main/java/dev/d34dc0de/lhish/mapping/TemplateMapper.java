package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.annotation.MappingMethodListSource;
import dev.d34dc0de.lhish.annotation.MappingOption;
import dev.d34dc0de.lhish.form.TemplateCreationForm;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.service.MapperService;
import dev.d34dc0de.lhish.view.TemplateIdNamePairListView;
import dev.d34dc0de.lhish.view.TemplateView;
import dev.d34dc0de.lhish.view.ValueFieldView;
import dev.d34dc0de.lhish.view.view_factory.ValueFieldViewFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TemplateMapper implements Mapper {

    private static MapperService mapperService;

    public TemplateMapper(@Lazy MapperService mapperService) {
        TemplateMapper.mapperService = mapperService;
    }

    @MappingMethod
    @MappingMethodListSource(Template.class)
    public static TemplateIdNamePairListView toTemplateIdNamePairListView(List<Template> templates) {
        return TemplateIdNamePairListView.builder()
                .templateIds(templates.stream().map(Template::getId).toList())
                .templateNames(templates.stream().map(Template::getName).toList())
                .build();
    }

    @MappingMethod
    public static TemplateView toTemplateView(Template template) {
        return TemplateView.builder()
                .valueFieldViews(mapperService.mapFromListToList(template.getValueFields(),ValueFieldView.class))
                .build();
    }

    @MappingMethod
    @MappingOption(name = "instance")
    public static Template toInstanceTemplateModel(TemplateCreationForm form) {
        return Template.builder()
                .name(form.getName())
                .isInstance(true)
                .valueFields(form.getFields())
                .build();
    }

    @MappingMethod
    @MappingOption(name = "non-instance")
    public static Template toNonInstanceTemplateModel(TemplateCreationForm form) {
        return Template.builder()
                .name(form.getName())
                .isInstance(false)
                .valueFields(form.getFields())
                .build();
    }
}
