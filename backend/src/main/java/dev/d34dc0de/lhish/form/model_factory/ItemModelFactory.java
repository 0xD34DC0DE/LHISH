package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.exceptions.FileSizeLimitException;
import dev.d34dc0de.lhish.exceptions.NullFieldException;
import dev.d34dc0de.lhish.form.CategoryCreationForm;
import dev.d34dc0de.lhish.form.ItemCreationForm;
import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.util.ImageUtils;
import org.bson.types.Binary;

import java.io.IOException;

public abstract class ItemModelFactory {



    public static Item toModel(ItemCreationForm itemCreationForm, String userId, String imageId) throws IOException {

        if(imageId == null) {
            throw new NullFieldException("Image cannot be null");
        }

        return Item.builder()
                .userId(userId)
                .categoryId(itemCreationForm.categoryId())
                .name(itemCreationForm.name())
                .description(itemCreationForm.description())
                .imageId(imageId)
                .build();
    }
}
