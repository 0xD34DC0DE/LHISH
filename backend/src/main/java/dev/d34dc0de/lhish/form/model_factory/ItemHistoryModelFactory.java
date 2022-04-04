package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.form.ItemHistoryActionForm;
import dev.d34dc0de.lhish.model.ItemHistory;
import dev.d34dc0de.lhish.model.ItemHistoryEntry;

import java.util.ArrayList;
import java.util.List;

public abstract class ItemHistoryModelFactory {

    public static ItemHistory toItemHistory(String accountId) {
        List<ItemHistoryEntry> itemHistoryEntries = new ArrayList<>();
        itemHistoryEntries.add(
                ItemHistoryEntry.builder()
                        .accountId(accountId)
                        .actionDescription("created this item")
                        .build()
        );
       return ItemHistory.builder()
               .entries(itemHistoryEntries)
               .build();
    }

    public static ItemHistoryEntry toItemHistoryEntry(ItemHistoryActionForm itemHistoryActionForm, String userId) {
        return ItemHistoryEntry.builder()
                .accountId(userId)
                .actionDescription(itemHistoryActionForm.action())
                .build();
    }
}
