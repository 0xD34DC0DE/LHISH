package dev.d34dc0de.lhish.controller;

import dev.d34dc0de.lhish.response.APIResponse;
import dev.d34dc0de.lhish.service.MapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class BaseController {

    @Autowired
    private MapperService mapperService;

    protected <T> T map(Object object, Class<T> targetType) {
        return mapperService.map(object, targetType);
    }

    protected <T> T map(Object object, Class<T> targetType, String option) {
        return mapperService.map(object, targetType, option);
    }

    protected <T> T mapFromList(List<?> list, Class<T> targetType) {
        return mapperService.mapFromList(list, targetType);
    }

    protected <T> List<T> mapToList(Object object, Class<T> targetType) {
        return mapperService.mapToList(object, targetType);
    }

    protected <T> ResponseEntity<T> ok(T body) {
        return ResponseEntity.ok(body);
    }

    protected ResponseEntity<APIResponse> APIOk(String message) {
        return APIResponse.ok(message);
    }

    protected ResponseEntity<APIResponse> APIError(String message) {
        return APIResponse.error(message);
    }

    protected record KVPair(String key, String value) {
        public static KVPair of(String key, String value) {
            return new KVPair(key, value);
        }
    }

    protected ResponseEntity<Map<String, String>> JSON(KVPair... kvPairs) {
        Map<String, String> map = new HashMap<>();
        for (KVPair kvPair : kvPairs) {
            map.put(kvPair.key(), kvPair.value());
        }
        return ResponseEntity.ok(map);
    }
}
