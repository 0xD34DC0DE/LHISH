package dev.d34dc0de.lhish.mapping.parameter;

import dev.d34dc0de.lhish.form.CategoryCreationForm;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryCreationParameter {
    private CategoryCreationForm categoryCreationForm;
    private String userId;
    private String imageId;
}
