package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.CategoryCreationForm;
import dev.d34dc0de.lhish.form.model_factory.CategoryModelFactory;
import dev.d34dc0de.lhish.form.model_factory.ImageModelFactory;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.Image;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.CategoryService;
import dev.d34dc0de.lhish.service.ImageService;
import dev.d34dc0de.lhish.view.CategoryView;
import dev.d34dc0de.lhish.view.view_factory.CategoryViewFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
        try {
            Image image = imageService.insert(ImageModelFactory.toModel(categoryCreationForm.image()));
            categoryService.insert(CategoryModelFactory.toModel(categoryCreationForm, principal.getId(), image.getId()));
            return ResponseEntity.ok(APIResponse.ok("Category successfully created"));
        } catch (IOException e) {
            logger.error("Error while creating image", e);
            return APIError("Image upload failed");
        }
    }

    @GetMapping("/all")
    private ResponseEntity<List<CategoryView>> getAll() {
        return ResponseEntity.ok(
                CategoryViewFactory.toCategoryListView(categoryService.findAll()).categories()
        );
    }

    @GetMapping("/all/ids")
    private ResponseEntity<List<String>> getAllIds() {
        return ResponseEntity.ok(
                CategoryViewFactory.toCategoryIdListView(categoryService.findAll()).categoryIds()
        );
    }
}
