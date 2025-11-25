package com.Auth.Auth_Service.service;

import com.Auth.Auth_Service.dto.*;
import com.Auth.Auth_Service.entity.UserEntity;
import com.Auth.Auth_Service.jwt.JwtUtil;
import com.Auth.Auth_Service.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;


import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Register
    public RegisterRespDTO registerUser(RegisterReqDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent())
            return new RegisterRespDTO(null, "User already exists with email: " + request.getEmail());
        UserEntity user = createUser(request);
        return new RegisterRespDTO("User registered with id " + user.getId(), null);
    }

    public UserEntity createUser(RegisterReqDTO userData) {
        UserEntity newUser = UserEntity.builder()
                .email(userData.getEmail())
                .password(passwordEncoder.encode(userData.getPassword()))
                .role(userData.getRole())
                .companyName(userData.getCompanyName())
                .contactNumber(userData.getContactNumber())
                .owner(userData.getOwner())
                .build();
        return userRepository.save(newUser);
    }

    // Login
//    public LoginRespDTO login(LoginReqDTO req) {
//        Optional<UserEntity> userOpt = userRepository.findByEmail(req.getEmail());
//        if (userOpt.isEmpty())
//            return new LoginRespDTO(null, "Invalid email or password", null);
//        UserEntity user = userOpt.get();
//        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
//            return new LoginRespDTO(null, "Invalid email or password", null);
//
//        // Create token with email
//        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
//        return new LoginRespDTO("Login successful", null, token);
//    }
//
//    public UserEntity getUserByToken(String email) {
//        return userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Invalid token"));
//    }

    public LoginRespDTO login(LoginReqDTO req) {
        Optional<UserEntity> userOpt = userRepository.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            return new LoginRespDTO(null, "Invalid email or password", null, null);
        }

        UserEntity user = userOpt.get();
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            return new LoginRespDTO(null, "Invalid email or password", null, null);
        }

        // Create token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        // Convert UserEntity to UserRespDTO
        UserRespDTO userResp = UserRespDTO.builder()
                .email(user.getEmail())
                .role(user.getRole())
                .companyName(user.getCompanyName())
                .contactNumber(user.getContactNumber())
                .owner(user.getOwner())
                .build();

        return new LoginRespDTO("Login successful", null, token, userResp);
    }


//    public void deleteUserById(Long id) {
//        userRepository.deleteById(id);
//    }

    public UserDeleteRespDTO deleteUserById(Long id) {
        Optional<UserEntity> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            return new UserDeleteRespDTO(false, "User with ID " + id + " does not exist");
        }

        userRepository.deleteById(id);
        return new UserDeleteRespDTO(true, "User deleted successfully");
    }


    // Get single user by email
    public UserRespDTO getUserByEmail(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserRespDTO.builder()
                .email(user.getEmail())
                .role(user.getRole())
                .companyName(user.getCompanyName())
                .contactNumber(user.getContactNumber())
                .owner(user.getOwner())
                .build();
    }

    // Get all users
    public AllUsersRespDTO getAllUsers() {
        List<UserRespDTO> userList = userRepository.findAll().stream()
                .map(user -> UserRespDTO.builder()
                        .email(user.getEmail())
                        .role(user.getRole())
                        .companyName(user.getCompanyName())
                        .contactNumber(user.getContactNumber())
                        .owner(user.getOwner())
                        .build())
                .toList();
        return new AllUsersRespDTO(userList);
    }

}
