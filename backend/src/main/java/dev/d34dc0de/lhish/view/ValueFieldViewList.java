package dev.d34dc0de.lhish.view;

import lombok.Builder;

import java.util.List;

public record ValueFieldViewList(List<ValueFieldView> valueFieldViews) {
    @Builder
    public ValueFieldViewList{}
}
