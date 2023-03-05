package com.elykp.api.dto.tags;

public class TagResponseDto {
    private Long id;
    private String name;

    public TagResponseDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
