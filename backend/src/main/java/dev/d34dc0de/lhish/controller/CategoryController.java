package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.CategoryCreationForm;
import dev.d34dc0de.lhish.mapping.parameter.CategoryCreationParameter;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.Category;
import dev.d34dc0de.lhish.model.Image;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.CategoryService;
import dev.d34dc0de.lhish.service.ImageService;
import dev.d34dc0de.lhish.view.CategoryIdNamePairListView;
import dev.d34dc0de.lhish.view.CategoryListView;
import dev.d34dc0de.lhish.view.CategoryView;
import dev.d34dc0de.lhish.view.DBMetricsView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/category")
public class CategoryController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(ItemController.class);

    private final CategoryService categoryService;

    private final ImageService imageService;

    public CategoryController(CategoryService categoryService, ImageService imageService) {
        this.categoryService = categoryService;
        this.imageService = imageService;
    }

    @PostMapping("/create")
    private ResponseEntity<APIResponse> create(@AuthenticationPrincipal Account principal,
                                               @ModelAttribute CategoryCreationForm categoryCreationForm) {
        Image image = imageService.save(map(categoryCreationForm.image(), Image.class));
        CategoryCreationParameter categoryCreationParameter = CategoryCreationParameter.builder()
                .categoryCreationForm(categoryCreationForm)
                .imageId(image.getId())
                .userId(principal.getId())
                .build();
        categoryService.save(map(categoryCreationParameter, Category.class));
        return APIOk("Category successfully created");

    }

    @GetMapping("/all")
    private ResponseEntity<List<CategoryView>> getAll() {
        return ok(mapFromList(categoryService.getAll(), CategoryListView.class).categories());
    }

    @GetMapping("/all/ids")
    private ResponseEntity<CategoryIdNamePairListView> getAllIds() {
        return ok(mapFromList(categoryService.getAll(), CategoryIdNamePairListView.class));
    }

    @GetMapping("/{id}")
    private ResponseEntity<CategoryView> findById(@PathVariable("id") String id) {
        return ok(map(categoryService.getById(id), CategoryView.class));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<APIResponse> delete(@PathVariable("id") String id) {
        categoryService.deleteById(id);
        return APIOk("Category successfully deleted");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/metrics")
    private ResponseEntity<DBMetricsView> getDBMetrics() {
        return ok(map(categoryService.getMetrics(), DBMetricsView.class));
    }
}
