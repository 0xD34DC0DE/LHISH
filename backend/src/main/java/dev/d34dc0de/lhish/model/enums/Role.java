package dev.d34dc0de.lhish.model.enums;

public enum Role {
    USER("USER"),
    ADMIN("ADMIN");

    private String name = "";

    Role(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
