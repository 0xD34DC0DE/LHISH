package dev.d34dc0de.lhish.form.model_factory;

import dev.d34dc0de.lhish.exceptions.FileSizeLimitException;
import dev.d34dc0de.lhish.model.Image;
import org.bson.types.Binary;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public abstract class ImageModelFactory {

    private static final long MAX_FILE_SIZE = 16_777_216; // 16 MB

    public static Image toModel(MultipartFile image) throws IOException {

        if (image.getBytes().length >= MAX_FILE_SIZE) {
            throw new FileSizeLimitException("File size limit of 16MB exceeded");
        }

        return Image.builder()
                .data(new Binary(image.getBytes()))
                .build();
    }

}
