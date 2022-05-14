package dev.d34dc0de.lhish.mapping.parameter;

import dev.d34dc0de.lhish.form.ItemHistoryActionForm;
import lombok.Builder;

public record ItemHistoryEntryParameters(ItemHistoryActionForm itemHistoryActionForm, String userId) {
    @Builder
    public ItemHistoryEntryParameters{}
}