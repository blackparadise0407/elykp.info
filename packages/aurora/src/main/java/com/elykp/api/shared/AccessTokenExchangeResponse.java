package com.elykp.api.shared;

import lombok.Getter;

@Getter
public class AccessTokenExchangeResponse {
    private String access_token;
    private Integer expires_in;
    private Integer refresh_expires_in;
    private String token_type;
    private String scope;
}
