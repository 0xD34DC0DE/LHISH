package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService extends BaseService<Category, CategoryRepository> {

    public CategoryService(CategoryRepository categoryRepository) {
        super(categoryRepository);
    }
}
