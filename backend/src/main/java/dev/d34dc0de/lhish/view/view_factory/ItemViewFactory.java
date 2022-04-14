package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.ItemListView;
import dev.d34dc0de.lhish.view.ItemView;
import dev.d34dc0de.lhish.view.ValueFieldView;

import java.util.List;

public abstract class ItemViewFactory {

    public static ItemView toView(TemplateService templateService, Item item) {
        List<ValueFieldView> fields;

        if(item.getTemplateId() != null) {
         Template template = templateService.findById(item.getTemplateId())
                 .orElseThrow(() -> new NotFoundException("Template", item.getTemplateId()));

        fields =  template.getValueFields().stream()
                .map(ValueFieldViewFactory::toValueFieldView)
                .toList();
        } else {
            fields = List.of();
        }

        return ItemView.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .imageId(item.getImageId())
                .historyId(item.getHistoryId())
                .valueFieldViewList(fields)
                .build();
    }

    public static ItemListView toItemListView(TemplateService templateService, List<Item> items) {
        return ItemListView.builder()
                .items(items.stream().map(item -> toView(templateService, item)).toList())
                .build();
    }
}
