package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.exceptions.FileSizeLimitException;
import dev.d34dc0de.lhish.exceptions.NullFieldException;
import dev.d34dc0de.lhish.form.CategoryCreationForm;
import dev.d34dc0de.lhish.model.Category;
import org.bson.types.Binary;

import java.io.IOException;

public abstract class CategoryModelFactory {

    private static final long MAX_FILE_SIZE = 16_777_216; // 16 MB

    public static Category toModel(CategoryCreationForm categoryCreationForm, String userId) throws IOException {

        if(categoryCreationForm.image() == null) {
            throw new NullFieldException("Image cannot be null");
        }

        if (categoryCreationForm.image().getBytes().length >= MAX_FILE_SIZE) {
            throw new FileSizeLimitException("File size limit of 16MB exceeded");
        }

        return Category.builder()
                .userId(userId)
                .name(categoryCreationForm.name())
                .description(categoryCreationForm.description())
                .image(new Binary(categoryCreationForm.image().getBytes()))
                .build();
    }

}
