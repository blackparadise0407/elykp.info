package com.elykp.api.photos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Data;

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

    @Column(name = "creator_id")
    private String creatorId;
}
