package dev.d34dc0de.lhish.view.view_factory;

import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.ItemHistory;
import dev.d34dc0de.lhish.service.AccountService;
import dev.d34dc0de.lhish.view.ItemHistoryView;

public abstract class ItemHistoryViewFactory {
    public static ItemHistoryView toItemHistoryView(AccountService accountService, ItemHistory itemHistory) {
        return ItemHistoryView.builder()
                .accountNames(
                        itemHistory.getEntries().stream()
                                .map(ItemHistory.ItemHistoryEntry::accountId)
                                .map(accountService::getById)
                                .map(Account::getUsername)
                                .toList()
                )
                .actions(
                        itemHistory.getEntries().stream()
                                .map(ItemHistoryEntry::actionDescription)
                                .toList()
                )
                .build();
    }
}
