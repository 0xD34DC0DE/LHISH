package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.Image;
import dev.d34dc0de.lhish.repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageService {

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image insert(Image image) {
        return imageRepository.save(image);
    }

    public Optional<Image> findById(String id) {
        return imageRepository.findById(id);
    }

    public void delete(String id) {
        imageRepository.deleteById(id);
    }
}
