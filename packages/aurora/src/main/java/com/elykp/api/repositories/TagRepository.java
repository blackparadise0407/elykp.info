package com.elykp.api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elykp.api.tags.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByNameIgnoreCaseContains(String name);
}
