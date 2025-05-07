package com.cgi.library.model;

import java.util.Date;


public class AuthToken {

    private String token;
    private Date expiration;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }
}
