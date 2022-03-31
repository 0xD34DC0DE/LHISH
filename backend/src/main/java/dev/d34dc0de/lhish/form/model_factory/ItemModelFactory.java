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

    private static final long MAX_FILE_SIZE = 16_777_216; // 16 MB

    public static Item toModel(ItemCreationForm itemCreationForm, String userId) throws IOException {

        if(itemCreationForm.image() == null) {
            throw new NullFieldException("Image cannot be null");
        }

        if (itemCreationForm.image().getBytes().length >= MAX_FILE_SIZE) {
            throw new FileSizeLimitException("File size limit of 16MB exceeded");
        }

        return Item.builder()
                .userId(userId)
                .categoryId(itemCreationForm.categoryId())
                .name(itemCreationForm.name())
                .description(itemCreationForm.description())
                .image(new Binary(itemCreationForm.image().getBytes()))
                .build();
    }
}
