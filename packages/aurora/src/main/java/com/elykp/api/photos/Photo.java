package com.elykp.api.photos;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Data
@Entity
@Table(name = "photo_entity", indexes = {
        @Index(name = "IDX_ID", columnList = "id"),
        @Index(name = "IDX_CREATOR_ID", columnList = "creator_id")
})
public class Photo {
    @Id
    @Column(length = 8)
    private String id;

    private String title;

    @Column(name = "creator_id", length = 36)
    private String creatorId;

    @Column(name = "like_count", columnDefinition = "integer default 0")
    private Integer likeCount;

    @Column(name = "nsfw", columnDefinition = "boolean default false")
    private Boolean nsfw;

    @Column(name = "created_at")
    private Long createdAt;

    @PrePersist
    protected void prePersist() {
        if (this.createdAt == null)
            createdAt = Instant.now().getEpochSecond();
    }
}
