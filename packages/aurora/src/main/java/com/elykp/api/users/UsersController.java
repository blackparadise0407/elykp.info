package com.elykp.api.users;

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
    private final SharedService sharedService;

    public UsersController(SharedService sharedService) {
        this.sharedService = sharedService;
    }

    @GetMapping("{userId}")
    public ResponseEntity<KeycloakUserResponse> getUserById(@PathVariable String userId) {
        KeycloakUserResponse userResponse = sharedService.getKcUserById(userId);
        return ResponseEntity.ok(userResponse);
    }
}