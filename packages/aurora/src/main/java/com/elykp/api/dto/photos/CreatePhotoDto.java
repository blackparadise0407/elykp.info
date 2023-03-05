package com.elykp.api.dto.photos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CreatePhotoDto {
    @NotBlank(message = "Title cannot be blank")
    private String title;

    private Boolean nsfw;

    @NotBlank(message = "Blurhash cannot be empty")
    private String blurhash;
}
