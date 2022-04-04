package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.form.ItemHistoryActionForm;
import dev.d34dc0de.lhish.form.model_factory.ItemHistoryModelFactory;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.ItemHistoryEntry;
import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.AccountService;
import dev.d34dc0de.lhish.service.ItemHistoryService;
import dev.d34dc0de.lhish.view.ItemHistoryView;
import dev.d34dc0de.lhish.view.view_factory.ItemHistoryViewFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/itemhistory")
public class ItemHistoryController {

    private final ItemHistoryService itemHistoryService;

    private final AccountService accountService;

    public ItemHistoryController(ItemHistoryService itemHistoryService, AccountService accountService) {
        this.itemHistoryService = itemHistoryService;
        this.accountService = accountService;
    }

    @GetMapping("/{id}")
    private ResponseEntity<ItemHistoryView> getItemHistoryById(@PathVariable String id) {
        return ResponseEntity.ok(
                ItemHistoryViewFactory.toItemHistoryView(
                        accountService,
                        itemHistoryService.getById(id)
                )
        );
    }

    @PostMapping("/commit")
    private ResponseEntity<APIResponse> commitItemAction(@AuthenticationPrincipal Account account,
                                                         @RequestBody ItemHistoryActionForm itemHistoryActionForm) {
        ItemHistoryEntry itemHistoryEntry =
                ItemHistoryModelFactory.toItemHistoryEntry(itemHistoryActionForm, account.getId());
        itemHistoryService.addItemHistoryEntry(itemHistoryActionForm.id(), itemHistoryEntry);
        return ResponseEntity.ok(APIResponse.ok("Item history entry committed"));
    }


}
