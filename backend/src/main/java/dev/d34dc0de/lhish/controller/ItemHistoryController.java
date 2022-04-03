package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.service.AccountService;
import dev.d34dc0de.lhish.service.ItemHistoryService;
import dev.d34dc0de.lhish.view.ItemHistoryView;
import dev.d34dc0de.lhish.view.view_factory.ItemHistoryViewFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
