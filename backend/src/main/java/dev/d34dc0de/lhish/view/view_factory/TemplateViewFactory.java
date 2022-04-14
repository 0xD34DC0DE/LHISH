package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.TemplateIdNamePairListView;
import dev.d34dc0de.lhish.view.TemplateView;

import java.util.List;

public abstract class TemplateViewFactory {
    static public TemplateView toTemplateView(TemplateService templateService, Template template) {
        return TemplateView.builder().build();
//                .valueFieldViews(ValueFieldViewFactory.toValueFieldViewList(templateService))
//                .build();
    }

    public static TemplateIdNamePairListView toTemplateIdNamePairListView(List<Template> templates) {
        return TemplateIdNamePairListView.builder()
                .templateIds(templates.stream().map(Template::getId).toList())
                .templateNames(templates.stream().map(Template::getName).toList())
                .build();
    }
}
