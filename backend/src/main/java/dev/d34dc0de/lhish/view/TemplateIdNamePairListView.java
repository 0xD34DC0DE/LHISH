package dev.d34dc0de.lhish.view;

import lombok.Builder;

import java.util.List;

public record TemplateIdNamePairListView(List<String> templateIds, List<String> templateNames) {
    @Builder
    public TemplateIdNamePairListView{}
}
