package com.artgallery.user_management_service.service;

import com.artgallery.user_management_service.dto.UserDTO;

import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    UserDTO createUser(UserDTO userDTO);
    void deleteUser(Long id);
}

