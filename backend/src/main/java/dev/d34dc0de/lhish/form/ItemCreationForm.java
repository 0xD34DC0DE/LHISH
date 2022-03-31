package dev.d34dc0de.lhish.form;


import org.springframework.web.multipart.MultipartFile;

public record ItemCreationForm(String categoryId, String name, String description, MultipartFile image) {
}
