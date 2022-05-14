package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.ItemHistoryActionForm;
import dev.d34dc0de.lhish.mapping.parameter.ItemHistoryEntryParameters;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.ItemHistoryEntry;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.ItemHistoryService;
import dev.d34dc0de.lhish.view.ItemHistoryView;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/itemhistory")
public class ItemHistoryController extends BaseController {

    private final ItemHistoryService itemHistoryService;

    public ItemHistoryController(ItemHistoryService itemHistoryService) {
        this.itemHistoryService = itemHistoryService;
    }

    @GetMapping("/{id}")
    private ResponseEntity<ItemHistoryView> getItemHistoryById(@PathVariable String id) {
        return ok(map(itemHistoryService.getById(id), ItemHistoryView.class));
    }

    @PostMapping("/commit")
    private ResponseEntity<APIResponse> commitItemAction(@AuthenticationPrincipal Account account,
                                                         @RequestBody ItemHistoryActionForm itemHistoryActionForm) {
        ItemHistoryEntryParameters itemHistoryEntryParameters = ItemHistoryEntryParameters.builder()
                .itemHistoryActionForm(itemHistoryActionForm)
                .userId(account.getId())
                .build();

        itemHistoryService.addItemHistoryEntry(
                itemHistoryActionForm.id(),
                map(itemHistoryEntryParameters, ItemHistoryEntry.class)
        );

        return APIOk("Item history entry committed");
    }
}
