package dev.d34dc0de.lhish.response;

import lombok.Builder;
import lombok.Data;

@Data
public class APIResponse {
    private String error;
    private String success;

    @Builder
    public APIResponse(String error, String success) {
        this.error = error == null ? "" : error;
        this.success = success == null ? "" : success;
    }
    
    public static APIResponse ok(String successMessage) {
        return new APIResponse(null, successMessage);
    }

    public static APIResponse error(String errorMessage) {
        return new APIResponse(errorMessage, null);
    }
}
