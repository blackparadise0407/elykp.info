package com.elykp.api.tags;

import java.util.List;

import com.elykp.api.dto.tags.TagResponseDto;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.elykp.api.dto.tags.CreateTagDto;

@RestController
@RequestMapping(value = "/api/tags")
public class TagsController {
    private final TagRepository tagRepository;

    public TagsController(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Tag> create(@RequestBody CreateTagDto createTagDto) throws DataIntegrityViolationException {
        try {
            Tag tag = new Tag();
            tag.setName(createTagDto.getName());
            return new ResponseEntity<>(tagRepository.save(tag), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tag already exists");
        }
    }

    @GetMapping
    public ResponseEntity<List<TagResponseDto>> search(@RequestParam String q) {
        return ResponseEntity.ok(tagRepository.findByNameIgnoreCaseContains(q));
    }

    @GetMapping("/trending")
    public ResponseEntity<List<TagResponseDto>> getTrendingTags() {
        return ResponseEntity.ok(tagRepository.findTrendingTags());
    }
}
