package com.elykp.api.users;

import java.util.Optional;

import org.springframework.cache.CacheManager;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elykp.api.shared.KeycloakUserResponse;
import com.elykp.api.shared.SharedService;

@RestController
@RequestMapping(value = "/api/users")
public class UsersController {
    private final RedisTemplate<String, String> redisTemplate;
    private final SharedService sharedService;

    public UsersController(CacheManager cacheManager, RedisTemplate<String, String> redisTemplate,
            SharedService sharedService) {
        this.redisTemplate = redisTemplate;
        this.sharedService = sharedService;
    }

    @GetMapping("{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
        Optional<String> accessToken = sharedService.requestAccessTokenFromIS();
        if (!accessToken.isPresent()) {
            return null;
        }
        System.out.println(accessToken.get());
        KeycloakUserResponse userResponse = sharedService.getKcUserById(accessToken.get(), userId);
        return ResponseEntity.ok(userResponse);
    }
}