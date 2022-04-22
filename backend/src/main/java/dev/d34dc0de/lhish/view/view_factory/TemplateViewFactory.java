package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.view.TemplateIdNamePairListView;
import dev.d34dc0de.lhish.view.TemplateView;

import java.util.List;

public abstract class TemplateViewFactory {

    public static TemplateIdNamePairListView toTemplateIdNamePairListView(List<Template> templates) {
        return TemplateIdNamePairListView.builder()
                .templateIds(templates.stream().map(Template::getId).toList())
                .templateNames(templates.stream().map(Template::getName).toList())
                .build();
    }

    public static TemplateView toTemplateView(Template template) {
        return TemplateView.builder()
                .valueFieldViews(ValueFieldViewFactory.toValueFieldViewList(template.getValueFields()))
                .build();
    }
}
