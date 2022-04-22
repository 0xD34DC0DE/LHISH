package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.ItemCreationForm;
import dev.d34dc0de.lhish.form.model_factory.ImageModelFactory;
import dev.d34dc0de.lhish.form.model_factory.ItemHistoryModelFactory;
import dev.d34dc0de.lhish.form.model_factory.ItemModelFactory;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.Image;
import dev.d34dc0de.lhish.model.ItemHistory;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.ImageService;
import dev.d34dc0de.lhish.service.ItemHistoryService;
import dev.d34dc0de.lhish.service.ItemService;
import dev.d34dc0de.lhish.service.TemplateService;
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

    private final ItemHistoryService itemHistoryService;

    private final ImageService imageService;

    private final TemplateService templateService;

    public ItemController(ItemService itemService,
                          ItemHistoryService itemHistoryService,
                          ImageService imageService,
                          TemplateService templateService) {
        this.itemService = itemService;
        this.itemHistoryService = itemHistoryService;
        this.imageService = imageService;
        this.templateService = templateService;
    }

    @PostMapping("/create")
    private ResponseEntity<APIResponse> create(@AuthenticationPrincipal Account principal,
                                               @ModelAttribute ItemCreationForm itemCreationForm) {
        Image image;
        try {
            image = imageService.insert(ImageModelFactory.toModel(itemCreationForm.image()));
        } catch (IOException e) {
            return APIError("Image upload failed");
        }
        ItemHistory itemHistory = createItemHistory(principal);

        if(templateService.findById(itemCreationForm.templateId()).isEmpty()) {
            return APIError("Template not found");
        }

        itemService.insert(
                ItemModelFactory.toItem(itemCreationForm,
                        principal.getId(),
                        image.getId(),
                        itemHistory.getId(),
                        itemCreationForm.templateId())
        );
        return APIOk("Item created successfully");
    }

    private ItemHistory createItemHistory(Account principal) {
        ItemHistory itemHistory = ItemHistoryModelFactory.toItemHistory(principal.getId());
        itemHistoryService.insert(itemHistory);
        return itemHistory;
    }

    @GetMapping("/all")
    private ResponseEntity<List<ItemView>> getAll() {
        return ResponseEntity.ok(
                ItemViewFactory.toItemListView(templateService, itemService.getAll()).items()
        );
    }

    @GetMapping("/category/{id}")
    private ResponseEntity<List<ItemView>> get(@PathVariable("id") String id) {
        return ResponseEntity.ok(
                ItemViewFactory.toItemListView(templateService, itemService.findByCategoryId(id)).items()
        );
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<APIResponse> delete(@PathVariable("id") String id) {
        itemService.deleteById(id);
        return APIOk("Item deleted successfully");
    }
}
