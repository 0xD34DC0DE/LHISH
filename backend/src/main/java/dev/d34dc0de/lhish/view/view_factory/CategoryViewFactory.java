package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.view.CategoryView;

import java.util.Base64;

public abstract class CategoryViewFactory {
    
    public static String encode(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

    public static CategoryView toView(Category category) {
        return CategoryView.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .image(encode(category.getImage().getData()))
                .build();
    }
}
