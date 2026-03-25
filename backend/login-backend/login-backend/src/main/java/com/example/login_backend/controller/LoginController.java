package com.example.login_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.login_backend.service.UserService;
import com.example.login_backend.model.User;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private UserService service;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){

        User existingUser = service.checkLogin(user);

        if(existingUser != null){
            return ResponseEntity.ok(existingUser);   // send user object
        } else {
            return ResponseEntity.status(401).body("Invalid Credentials");
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user){

        boolean status = service.registerUser(user);

        if(status){
            return ResponseEntity.ok("Registration Successful");
        } else {
            return ResponseEntity.badRequest().body("User Already Exists");
        }
    }



}
