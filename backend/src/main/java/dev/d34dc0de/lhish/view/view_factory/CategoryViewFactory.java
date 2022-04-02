package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.view.CategoryIdListView;
import dev.d34dc0de.lhish.view.CategoryListView;
import dev.d34dc0de.lhish.view.CategoryView;

import java.util.List;

public abstract class CategoryViewFactory {

    public static CategoryView toCategoryView(Category category) {
        return CategoryView.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .imageId(category.getImageId())
                .build();
    }

    public static CategoryListView toCategoryListView(List<Category> categories) {
        return CategoryListView.builder()
                .categories(categories.stream().map(CategoryViewFactory::toCategoryView).toList())
                .build();
    }

    public static CategoryIdListView toCategoryIdListView(List<Category> categories) {
        return CategoryIdListView.builder()
                .categoryIds(categories.stream().map(Category::getId).toList())
                .build();
    }
}
