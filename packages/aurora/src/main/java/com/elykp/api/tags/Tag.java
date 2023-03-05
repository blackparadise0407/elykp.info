package com.elykp.api.tags;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.elykp.api.dto.tags.TagResponseDto;
import com.elykp.api.photos.Photo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@NamedNativeQuery(name = "Tag.findTrendingTags",
        query = "SELECT tag_entity.id, tag_entity.name, COUNT(*) " +
                "FROM tag_entity " +
                "JOIN photo_tags ON photo_tags.tag_id = tag_entity.id " +
                "GROUP BY tag_entity.id, tag_entity.name " +
                "ORDER BY COUNT(*) DESC " +
                "LIMIT 10",
        resultSetMapping = "Mapping.TagResponseDto")
@SqlResultSetMapping(name = "Mapping.TagResponseDto",
        classes = @ConstructorResult(targetClass = TagResponseDto.class,
                columns = {@ColumnResult(name = "id"),
                        @ColumnResult(name = "name")
        }))
@Table(name = "tag_entity", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "name" }, name = "name_constraint")
}, indexes = {
        @Index(name = "IDX_NAME", columnList = "name")
})
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(name = "created_at")
    private Long createdAt;

    @PrePersist
    protected void prePersist() {
        if (this.createdAt == null)
            createdAt = Instant.now().getEpochSecond();
    }

    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private Set<Photo> photos = new HashSet<>();
}
