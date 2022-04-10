package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.TemplateView;

public abstract class TemplateViewFactory {
    static public TemplateView toTemplateView(TemplateService templateService, Template template) {
        return TemplateView.builder()
                .valueFieldViews(ValueFieldViewFactory.toValueFieldViewList(templateService, template))
                .build();
    }
}
