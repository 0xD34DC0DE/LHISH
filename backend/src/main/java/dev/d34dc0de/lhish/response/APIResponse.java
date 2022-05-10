package dev.d34dc0de.lhish.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
public class APIResponse {
    private String error;
    private String success;

    @Builder
    public APIResponse(String error, String success) {
        this.error = error == null ? "" : error;
        this.success = success == null ? "" : success;
    }
    
    public static ResponseEntity<APIResponse> ok(String successMessage) {
        return ResponseEntity.ok(new APIResponse(null, successMessage));
    }

    public static ResponseEntity<APIResponse> error(String errorMessage) {
        return ResponseEntity.ok(new APIResponse(errorMessage, null));
    }
}
