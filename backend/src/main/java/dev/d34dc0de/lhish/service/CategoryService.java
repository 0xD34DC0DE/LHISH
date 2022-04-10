package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    /**
     * Try to find a category by its id.
     * @param id id of the category to find.
     * @return Optional&lt;Category&gt; if found, empty Optional otherwise.
     */
    public Optional<Category> findById(String id) {
        return categoryRepository.findById(id);
    }

    /**
     * Get a category by its id.
     * @param id id of the category to get.
     * @return Category if found, throws NotFoundException otherwise.
     */
    public Category getById(String id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Category", id));
    }

    public void deleteById(String id) {
        //TODO don't forget to delete by cascade
        categoryRepository.deleteById(id);
    }
}
