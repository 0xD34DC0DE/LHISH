package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.model.Image;
import dev.d34dc0de.lhish.service.ImageService;
import org.bson.types.Binary;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        return ResponseEntity.of(
                imageService.findById(id)
                        .map(Image::getData)
                        .map(Binary::getData)
        );
    }
}
