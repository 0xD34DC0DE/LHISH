package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.view.CategoryIdNamePairListView;
import dev.d34dc0de.lhish.view.CategoryListView;
import dev.d34dc0de.lhish.view.CategoryView;

import java.util.List;
import java.util.stream.Collectors;

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

    public static CategoryIdNamePairListView toCategoryIdNamePairListView(List<Category> categories) {
        return CategoryIdNamePairListView.builder()
                .categoryIds(categories.stream().map(Category::getId).toList())
                .categoryNames(categories.stream().map(Category::getName).toList())
                .build();
    }
}
