package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.mapping.parameter.ItemHistoryEntryParameters;
import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.ItemHistory;
import dev.d34dc0de.lhish.model.ItemHistoryEntry;
import dev.d34dc0de.lhish.service.AccountService;
import dev.d34dc0de.lhish.view.ItemHistoryView;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class ItemHistoryMapper implements Mapper {

    private static AccountService accountService;

    public ItemHistoryMapper(AccountService accountService) {
        ItemHistoryMapper.accountService = accountService;
    }

    @MappingMethod
    public static ItemHistory toItemHistory(String accountId) {
        List<ItemHistoryEntry> itemHistoryEntries = getItemCreationHistory(accountId);
        return ItemHistory.builder()
                .entries(itemHistoryEntries)
                .build();
    }

    private static List<ItemHistoryEntry> getItemCreationHistory(String accountId) {
        List<ItemHistoryEntry> itemHistoryEntries = new ArrayList<>();
        itemHistoryEntries.add(
                ItemHistoryEntry.builder()
                        .accountId(accountId)
                        .actionDescription("Created this item")
                        .timestamp(LocalDateTime.now())
                        .build()
        );
        return itemHistoryEntries;
    }

    @MappingMethod
    public static ItemHistoryView toItemHistoryView(ItemHistory itemHistory) {
        return ItemHistoryView.builder()
                .accountNames(
                        itemHistory.getEntries().stream()
                                .map(ItemHistoryEntry::accountId)
                                .map(accountService::getById)
                                .map(Account::getUsername)
                                .toList()
                )
                .actions(
                        itemHistory.getEntries().stream()
                                .map(ItemHistoryEntry::actionDescription)
                                .toList()
                )
                .timestamps(
                        itemHistory.getEntries().stream()
                                .map(ItemHistoryEntry::timestamp)
                                .toList()
                )
                .build();
    }

    @MappingMethod
    public static ItemHistoryEntry toItemHistoryEntry(ItemHistoryEntryParameters itemHistoryEntryParameter) {
        return ItemHistoryEntry.builder()
                .accountId(itemHistoryEntryParameter.userId())
                .actionDescription(itemHistoryEntryParameter.itemHistoryActionForm().action())
                .timestamp(LocalDateTime.now())
                .build();
    }
}
