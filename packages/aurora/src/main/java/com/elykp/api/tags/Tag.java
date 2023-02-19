package com.elykp.api.tags;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
@Entity
@Table(name = "tag_entity", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "name" }, name = "name_constraint")
}, indexes = {
        @Index(name = "IDX_NAME", columnList = "name")
})
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(length = 100)
    private String name;

    private Long createdAt;

    @PrePersist
    protected void prePersist() {
        if (this.createdAt == null)
            createdAt = Instant.now().getEpochSecond();
    }
}
