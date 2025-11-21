package com.Auth.Auth_Service.service;

import com.Auth.Auth_Service.dto.RegisterReqDTO;
import com.Auth.Auth_Service.dto.RegisterRespDTO;
import com.Auth.Auth_Service.entity.UserEntity;
import com.Auth.Auth_Service.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public RegisterRespDTO registerUser(RegisterReqDTO request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists with email: " + request.getEmail());
        }

        // Encode password
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        // Build entity
        UserEntity user = UserEntity.builder()
                .email(request.getEmail())
                .password(encodedPassword)
                .role(request.getRole())
                .companyName(request.getCompanyName())
                .contactNumber(request.getContactNumber())
                .build();

        // Save user
        userRepository.save(user);

        // Return response
        return RegisterRespDTO.builder()
                .message("User registered successfully")
                .email(user.getEmail())
                .build();
    }
}
