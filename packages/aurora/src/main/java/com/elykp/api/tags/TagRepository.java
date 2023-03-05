package com.elykp.api.tags;

import java.util.List;

import com.elykp.api.dto.tags.TagResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

public interface TagRepository extends JpaRepository<Tag, Long> {
    List<TagResponseDto> findByNameIgnoreCaseContains(String name);

    @Query(nativeQuery = true)
    List<TagResponseDto> findTrendingTags();
}
