package com.elykp.api.tags;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.elykp.api.dto.tags.CreateTag;
import com.elykp.api.repositories.TagRepository;

@RestController
@RequestMapping(value = "/api/tags")
public class TagsController {
    private final TagRepository tagRepository;

    public TagsController(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @PostMapping()
    public ResponseEntity<Tag> create(@RequestBody CreateTag createTag) throws DataIntegrityViolationException {
        try {
            Tag tag = new Tag();
            tag.setName(createTag.getName());
            tagRepository.save(tag);
            return ResponseEntity.ok(tag);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tag already exists");
        }
    }

    @GetMapping()
    public ResponseEntity<List<Tag>> search(@RequestParam String q) {
        return ResponseEntity.ok(tagRepository.findByNameIgnoreCaseContains(q));
    }

    @GetMapping("/trendings")
    public ResponseEntity<List<Tag>> getTrendingTags() {
        return ResponseEntity.ok(tagRepository.findAll());
    }
}
