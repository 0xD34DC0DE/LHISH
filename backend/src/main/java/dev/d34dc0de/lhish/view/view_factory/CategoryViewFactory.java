package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.view.CategoryView;

public abstract class CategoryViewFactory {

    public static CategoryView toView(Category category) {
        return CategoryView.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .imageId(category.getImageId())
                .build();
    }
}
