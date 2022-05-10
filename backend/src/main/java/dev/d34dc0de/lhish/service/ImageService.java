package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.Image;
import dev.d34dc0de.lhish.repository.ImageRepository;
import org.springframework.stereotype.Service;

@Service
public class ImageService extends BaseService<Image, ImageRepository> {

    public ImageService(ImageRepository imageRepository) {
        super(imageRepository);
    }
}
