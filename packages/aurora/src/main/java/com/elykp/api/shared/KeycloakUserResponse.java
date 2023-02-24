package com.elykp.api.shared;

import lombok.Getter;

@Getter
public class KeycloakUserResponse {
    private String id;
    private Long createdTimestamp;
    private String username;
    private Boolean enabled;
    private Boolean emailVerified;
    private Boolean totp;
    private String firstName;
    private String lastName;
    private String email;
}
