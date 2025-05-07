package com.cgi.library.service;

import com.cgi.library.entity.User;
import com.cgi.library.model.AuthToken;
import com.cgi.library.model.LoginRequest;
import com.cgi.library.model.UserDTO;
import com.cgi.library.repository.UserRepository;
import com.cgi.library.security.JwtUtil;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.modelMapper = ModelMapperFactory.getMapper();
        this.jwtUtil = jwtUtil;
    }

    public AuthToken login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        } else if(!user.getPassword().equals(loginRequest.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }
        return jwtUtil.generateToken(user);
    }

    public UserDTO getUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user = userRepository.findByEmail(email);
       return modelMapper.map(user, UserDTO.class);
    }

    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

//    public UserDTO getUserByEmail(String email) {
//        User user = userRepository.findUserByEmail(email);
//        return modelMapper.map(user, UserDTO.class);
//    }
}
