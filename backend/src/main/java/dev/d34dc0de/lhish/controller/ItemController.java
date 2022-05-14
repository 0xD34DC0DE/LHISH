package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.ItemCreationForm;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.ItemService;
import dev.d34dc0de.lhish.view.ItemListView;
import dev.d34dc0de.lhish.view.ItemView;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController extends BaseController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/create")
    private ResponseEntity<APIResponse> create(@AuthenticationPrincipal Account principal,
                                               @ModelAttribute ItemCreationForm itemCreationForm) {
        itemService.insertFromForm(itemCreationForm, principal.getId());
        return APIOk("Item created successfully");
    }

    @GetMapping("/all")
    private ResponseEntity<List<ItemView>> getAll() {
        return ok(mapFromList(itemService.getAll(), ItemListView.class).items());
    }

    @GetMapping("/category/{id}")
    private ResponseEntity<List<ItemView>> get(@PathVariable("id") String id) {
        return ok(mapFromList(itemService.findByCategoryId(id), ItemListView.class).items());
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<APIResponse> delete(@PathVariable("id") String id) {
        itemService.deleteById(id);
        return APIOk("Item deleted successfully");
    }

}
