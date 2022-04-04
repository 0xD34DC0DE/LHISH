package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.exceptions.NullFieldException;
import dev.d34dc0de.lhish.form.ItemCreationForm;
import dev.d34dc0de.lhish.model.Item;

public abstract class ItemModelFactory {

    public static Item toItem(ItemCreationForm itemCreationForm, String userId, String imageId, String historyId) {

        if (imageId == null) {
            throw new NullFieldException("Image cannot be null");
        }

        return Item.builder()
                .userId(userId)
                .categoryId(itemCreationForm.categoryId())
                .name(itemCreationForm.name())
                .description(itemCreationForm.description())
                .imageId(imageId)
                .historyId(historyId)
                .build();
    }
}
