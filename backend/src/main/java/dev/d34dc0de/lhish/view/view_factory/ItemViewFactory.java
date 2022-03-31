package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.util.ImageUtils;
import dev.d34dc0de.lhish.view.ItemView;

public abstract class ItemViewFactory {
    public static ItemView toView(Item item) {
        return ItemView.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .image(ImageUtils.bytesToBase64String(item.getImage().getData()))
                .build();
    }
}
