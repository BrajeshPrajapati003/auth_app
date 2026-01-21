package com.brajesh.auth.auth_app_backend.auth.utils;

import java.util.UUID;

public class UserHelper {

    private UserHelper() {
        // prevent instantiation
    }

    public static UUID parseUuid(String userId) {
        try {
            return UUID.fromString(userId);
        } catch (IllegalArgumentException | NullPointerException ex) {
            throw new IllegalArgumentException("Invalid UUID: " + userId);
        }
    }
}
