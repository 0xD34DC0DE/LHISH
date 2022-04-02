package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.CategoryCreationForm;
import dev.d34dc0de.lhish.form.model_factory.CategoryModelFactory;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.CategoryService;
import dev.d34dc0de.lhish.view.CategoryView;
import dev.d34dc0de.lhish.view.view_factory.CategoryViewFactory;
import io.vavr.control.Try;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/category")
public class CategoryController extends BaseController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/create")
    private ResponseEntity<APIResponse> create(@AuthenticationPrincipal Account principal,
                                               @ModelAttribute CategoryCreationForm categoryCreationForm) {
        return Try.of(() -> CategoryModelFactory.toModel(categoryCreationForm, principal.getId()))
                .onSuccess(categoryService::insert)
                .map(c -> APIOk("Category created successfully"))
                .getOrElseThrow(getRethrowFunction());
    }

    @GetMapping("/all")
    private ResponseEntity<List<CategoryView>> getAll() {
        return ResponseEntity.ok(
                categoryService.findAll().stream()
                        .map(CategoryViewFactory::toView).toList()
        );
    }
}
