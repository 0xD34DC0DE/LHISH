package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.ItemCreationForm;
import dev.d34dc0de.lhish.form.model_factory.ItemModelFactory;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.CategoryService;
import dev.d34dc0de.lhish.service.ItemService;
import dev.d34dc0de.lhish.view.ItemView;
import dev.d34dc0de.lhish.view.view_factory.ItemViewFactory;
import io.vavr.control.Try;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController extends BaseController {
    //create logger for this class
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(ItemController.class);

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/create")
    private ResponseEntity<APIResponse> create(@AuthenticationPrincipal Account principal,
                                               @ModelAttribute ItemCreationForm itemCreationForm) {
        return Try.of(() -> ItemModelFactory.toModel(itemCreationForm, principal.getId()))
                .onSuccess(item ->
                        Try.of(() -> itemService.insert(item))
                                .getOrElseThrow(getRethrowFunction())
                )
                .map(c -> {
                    logger.info(c.toString());
                    return ResponseEntity.ok(APIResponse.ok("Item created successfully"));
                })
                .getOrElseThrow(getRethrowFunction());
    }

    @GetMapping("/all")
    private ResponseEntity<List<ItemView>> getAll() {
        return ResponseEntity.ok(itemService.getAll().stream().map(ItemViewFactory::toView).toList());
    }
}
