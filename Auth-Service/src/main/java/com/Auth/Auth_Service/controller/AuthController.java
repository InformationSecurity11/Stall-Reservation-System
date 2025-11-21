package com.Auth.Auth_Service.controller;

import com.Auth.Auth_Service.dto.RegisterReqDTO;
import com.Auth.Auth_Service.dto.RegisterRespDTO;
import com.Auth.Auth_Service.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterRespDTO> register(@RequestBody RegisterReqDTO request) {
        RegisterRespDTO response = authService.registerUser(request);
        return ResponseEntity.ok(response);
    }
}
