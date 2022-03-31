package dev.d34dc0de.lhish.util;

import java.util.Base64;

public abstract class ImageUtils {
    public static String bytesToBase64String(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }
}
