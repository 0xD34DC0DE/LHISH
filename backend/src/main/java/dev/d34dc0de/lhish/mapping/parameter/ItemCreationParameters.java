package dev.d34dc0de.lhish.mapping.parameter;

import dev.d34dc0de.lhish.form.ItemCreationForm;
import lombok.Builder;

public record ItemCreationParameters(
        ItemCreationForm itemCreationForm,
        String userId,
        String imageId,
        String historyId,
        String templateId
) {
    @Builder
    public ItemCreationParameters{}
}
