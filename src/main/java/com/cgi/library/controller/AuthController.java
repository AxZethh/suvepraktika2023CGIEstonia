package com.cgi.library.controller;

import com.cgi.library.entity.User;
import com.cgi.library.model.AuthToken;
import com.cgi.library.model.LoginRequest;
import com.cgi.library.model.UserRole;
import com.cgi.library.service.UserService;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public AuthToken login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User newUser) {
        newUser.setId(UUID.randomUUID());
        newUser.setRole(UserRole.READER);
        userService.saveUser(newUser);

        return ResponseEntity.ok("Signup successful");
    }
}
