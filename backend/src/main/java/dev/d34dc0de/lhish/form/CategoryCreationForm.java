package dev.d34dc0de.lhish.form;

import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

public record CategoryCreationForm(String name, String description, MultipartFile image) {
    @Builder
    public CategoryCreationForm {};
}
