package com.cgi.library.model;

import java.util.UUID;

public class UserDTO {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private UserRole userRole;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setRole(UserRole userRole) {
        this.userRole = userRole;
    }
}
