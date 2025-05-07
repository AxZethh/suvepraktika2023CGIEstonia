package com.cgi.library.controller;

import com.cgi.library.model.UserDTO;
import com.cgi.library.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UserDTO> getUser() {
        UserDTO user = userService.getUser();
        System.out.println(user.getUserRole());
        return ResponseEntity.ok(user);
    }
}
