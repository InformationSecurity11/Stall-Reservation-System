package com.Auth.Auth_Service.controller;

import com.Auth.Auth_Service.dto.RegisterReqDTO;
import com.Auth.Auth_Service.dto.RegisterRespDTO;
import com.Auth.Auth_Service.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
//@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterRespDTO> register(@RequestBody RegisterReqDTO req) {
        RegisterRespDTO response = authService.registerUser(req);
        if (response.getError() != null) return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
