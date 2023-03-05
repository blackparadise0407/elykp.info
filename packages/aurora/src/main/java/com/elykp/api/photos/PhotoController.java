package com.elykp.api.photos;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.elykp.api.dto.photos.CreatePhotoDto;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {
    private final PhotoRepository photoRepository;

    public PhotoController(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    @GetMapping
    public ResponseEntity<List<Photo>> getListPhoto() {
        return ResponseEntity.ok(photoRepository.findAll());
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Photo> create(JwtAuthenticationToken authentication,
                                        @Valid @RequestBody CreatePhotoDto createPhotoDto) {
        Photo photo = new Photo();
        photo.setId(NanoIdUtils.randomNanoId(
                NanoIdUtils.DEFAULT_NUMBER_GENERATOR,
                NanoIdUtils.DEFAULT_ALPHABET, 8));
        photo.setNsfw(createPhotoDto.getNsfw());
        photo.setCreatorId(authentication.getTokenAttributes().get("sub").toString());
        photo.setTitle(createPhotoDto.getTitle());
        photo.setBlurhash(createPhotoDto.getBlurhash());
        photo.setLikeCount(0);
        return new ResponseEntity<>(photoRepository.save(photo), HttpStatus.CREATED);
    }
}
