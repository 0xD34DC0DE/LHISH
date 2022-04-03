package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.form.ItemHistoryActionForm;
import dev.d34dc0de.lhish.model.ItemHistory;

public abstract class ItemHistoryModelFactory {
    // toItemHistoryModelEntry
    public static ItemHistory.ItemHistoryEntry toItemHistoryModelEntry(ItemHistoryActionForm itemHistoryActionForm, String userId) {
        return ItemHistory.ItemHistoryEntry.builder()
                .accountId(userId)
                .actionDescription(itemHistoryActionForm.action())
                .build();
    }
}
