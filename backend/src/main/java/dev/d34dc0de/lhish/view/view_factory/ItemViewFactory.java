package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.view.ItemListView;
import dev.d34dc0de.lhish.view.ItemView;

import java.util.List;

public abstract class ItemViewFactory {

    public static ItemView toView(Item item) {
        return ItemView.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .imageId(item.getImageId())
                .build();
    }

    public static ItemListView toItemListView(List<Item> items) {
        return ItemListView.builder()
                .items(items.stream().map(ItemViewFactory::toView).toList())
                .build();
    }
}
