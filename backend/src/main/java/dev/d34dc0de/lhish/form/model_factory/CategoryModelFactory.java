package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.exceptions.NullFieldException;
import dev.d34dc0de.lhish.form.CategoryCreationForm;
import dev.d34dc0de.lhish.model.Category;

public abstract class CategoryModelFactory {

    public static Category toModel(CategoryCreationForm categoryCreationForm, String userId, String imageId) {

        if (imageId == null) {
            throw new NullFieldException("Image cannot be null");
        }

        return Category.builder()
                .userId(userId)
                .name(categoryCreationForm.name())
                .description(categoryCreationForm.description())
                .imageId(imageId)
                .build();
    }

}
