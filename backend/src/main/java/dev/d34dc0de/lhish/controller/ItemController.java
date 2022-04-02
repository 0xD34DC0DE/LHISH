package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.ItemCreationForm;
import dev.d34dc0de.lhish.form.model_factory.ImageModelFactory;
import dev.d34dc0de.lhish.form.model_factory.ItemModelFactory;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.Image;
import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.ImageService;
import dev.d34dc0de.lhish.service.ItemService;
import dev.d34dc0de.lhish.view.ItemView;
import dev.d34dc0de.lhish.view.view_factory.ItemViewFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController extends BaseController {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(ItemController.class);

    private final ItemService itemService;

    private final ImageService imageService;

    public ItemController(ItemService itemService, ImageService imageService) {
        this.itemService = itemService;
        this.imageService = imageService;
    }

    @PostMapping("/create")
    private ResponseEntity<APIResponse> create(@AuthenticationPrincipal Account principal,
                                               @ModelAttribute ItemCreationForm itemCreationForm) {
        try {
            Image image = ImageModelFactory.toModel(itemCreationForm.image());
            image = imageService.insert(image);
            Item item = ItemModelFactory.toModel(itemCreationForm, principal.getId(), image.getId());
            itemService.insert(item);
            return APIOk("Item created successfully");
        } catch (IOException e) {
            logger.error("Error while creating image", e);
            return APIError("Image upload failed");
        }
    }

    @GetMapping("/all")
    private ResponseEntity<List<ItemView>> getAll() {
        return ResponseEntity.ok(itemService.getAll().stream().map(ItemViewFactory::toView).toList());
    }
}
