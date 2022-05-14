package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.annotation.MappingMethodListSource;
import dev.d34dc0de.lhish.exceptions.NullFieldException;
import dev.d34dc0de.lhish.form.CategoryCreationForm;
import dev.d34dc0de.lhish.mapping.parameter.CategoryCreationParameter;
import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.view.CategoryIdNamePairListView;
import dev.d34dc0de.lhish.view.CategoryListView;
import dev.d34dc0de.lhish.view.CategoryView;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryMapper implements Mapper {

    @MappingMethod
    public static CategoryView toCategoryView(Category category) {
        return CategoryView.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .imageId(category.getImageId())
                .build();
    }

    @MappingMethod
    @MappingMethodListSource(Category.class)
    public static CategoryListView toCategoryListView(List<Category> categories) {
        return CategoryListView.builder()
                .categories(categories.stream().map(CategoryMapper::toCategoryView).toList())
                .build();
    }

    @MappingMethod
    @MappingMethodListSource(Category.class)
    public static CategoryIdNamePairListView toCategoryIdNamePairListView(List<Category> categories) {
        return CategoryIdNamePairListView.builder()
                .categoryIds(categories.stream().map(Category::getId).toList())
                .categoryNames(categories.stream().map(Category::getName).toList())
                .build();
    }

    @MappingMethod
    public static Category toModel(CategoryCreationParameter parameter) {
        if (parameter.getImageId() == null) {
            throw new NullFieldException("Image cannot be null");
        }

        CategoryCreationForm form = parameter.getCategoryCreationForm();

        return Category.builder()
                .userId(parameter.getUserId())
                .name(form.name())
                .description(form.description())
                .imageId(parameter.getImageId())
                .build();
    }
}
