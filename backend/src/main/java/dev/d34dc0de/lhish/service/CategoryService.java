package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category insert(Category category) {
        return categoryRepository.insert(category);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
}
