package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.ItemListView;
import dev.d34dc0de.lhish.view.ItemView;

import java.util.List;

public abstract class ItemViewFactory {

    public static ItemView toView(TemplateService templateService, Item item) {
        return ItemView.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .imageId(item.getImageId())
                .historyId(item.getHistoryId())
                .valueFields(
                        ValueFieldViewFactory.toValueFieldViewList(
                                templateService,
                                templateService.getById(item.getTemplateId())
                        )
                )
                .build();
    }

    public static ItemListView toItemListView(TemplateService templateService, List<Item> items) {
        return ItemListView.builder()
                .items(items.stream().map(item -> toView(templateService, item)).toList())
                .build();
    }
}
