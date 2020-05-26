package com.example.springsecurity.model;

public enum NounStatus {
    MMG("MMG", "일반명사"),
    NNP("NNP", "고유명사"),
    NNG("NNG", "보통명사"),
    XSN("XSN", "명사파생접미사"),
    NNB("NNB", "의존명사");

    private String code;
    private String title;
    NounStatus(String code, String title) {
        this.code = code;
        this.title = title;
    };

    public String getCode() {
        return code;
    }

    public String getTitle() {
        return title;
    }
}