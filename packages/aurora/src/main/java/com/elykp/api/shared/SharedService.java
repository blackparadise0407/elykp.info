package com.elykp.api.shared;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SharedService {
    private final RestTemplate restTemplate;
    @Value("${web.authority}")
    private String authority;
    @Value("${web.client-id}")
    private String clientId;
    @Value("${web.client-secret}")
    private String clientSecret;
    @Value("${web.authority-api-url}")
    private String authorityApiUrl;

    public SharedService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Optional<String> requestAccessTokenFromIS() throws HttpClientErrorException.Unauthorized {
        String url = authority + "/protocol/openid-connect/token";

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "client_credentials");
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(map, httpHeaders);
        ResponseEntity<AccessTokenExchangeResponse> response = restTemplate.exchange(url,
                HttpMethod.POST,
                body,
                AccessTokenExchangeResponse.class);

        return Optional.ofNullable(response.getBody()).map(AccessTokenExchangeResponse::getAccess_token);
    }

    @Nullable
    @Cacheable(value = "user", key = "#userId", unless = "#result == null")
    public KeycloakUserResponse getKcUserById(String userId) throws HttpClientErrorException.NotFound {
        Optional<String> accessToken = requestAccessTokenFromIS();
        if (accessToken.isEmpty()) {
            return null;
        }

        String url = authorityApiUrl + "/users/" + userId;

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(accessToken.get());
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(null, httpHeaders);

        try {
            ResponseEntity<KeycloakUserResponse> response = restTemplate.exchange(url, HttpMethod.GET, body,
                    KeycloakUserResponse.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            }
        } catch (HttpClientErrorException.NotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return null;
    }

}
