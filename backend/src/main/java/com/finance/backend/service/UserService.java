package com.finance.backend.service;

import com.finance.backend.dto.LoginRequest;
import com.finance.backend.dto.LoginResponse;
import com.finance.backend.entity.User;
import com.finance.backend.repository.UserRepository;
import com.finance.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    // Register User
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Login User
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(token);
    }


}