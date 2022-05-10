package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.annotation.MappingMethodSourceInterface;
import dev.d34dc0de.lhish.exceptions.FileSizeLimitException;
import dev.d34dc0de.lhish.model.Image;
import org.bson.types.Binary;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class ImageMapper implements Mapper {

    private static final long MAX_FILE_SIZE = 16_777_216; // 16 MB

    @MappingMethod
    @MappingMethodSourceInterface(MultipartFile.class)
    public static Image toModel(MultipartFile image) throws IOException {

        if (image.getBytes().length >= MAX_FILE_SIZE) {
            throw new FileSizeLimitException("File size limit of 16MB exceeded");
        }

        return Image.builder()
                .data(new Binary(image.getBytes()))
                .build();
    }

    @MappingMethod
    public static byte[] toBytes(Image image) {
        return image.getData().getData();
    }
}
