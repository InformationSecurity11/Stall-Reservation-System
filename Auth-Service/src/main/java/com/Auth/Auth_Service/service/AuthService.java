package com.Auth.Auth_Service.service;

import com.Auth.Auth_Service.dto.RegisterReqDTO;
import com.Auth.Auth_Service.dto.RegisterRespDTO;
import com.Auth.Auth_Service.entity.UserEntity;
import com.Auth.Auth_Service.repo.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository , PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }



    public RegisterRespDTO registerUser(RegisterReqDTO request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new RegisterRespDTO(null, "User already exists with email: " + request.getEmail());
        }
        var userData = this.createUser(request);
        if(userData.getId()==null)  return new RegisterRespDTO(null, "Internal Error Happened..!");

        return new RegisterRespDTO(String.format("user registered under id %s", userData.getId()),null);
    }

    public UserEntity createUser(RegisterReqDTO userData){
        UserEntity newUser = UserEntity.builder()
                .email(userData.getEmail())
                .password(passwordEncoder.encode(userData.getPassword()))
                .owner(userData.getOwner())
                .role(userData.getRole())
                .companyName(userData.getCompanyName())
                .contactNumber(userData.getContactNumber())
                .build();
        return userRepository.save(newUser);
    }
}
