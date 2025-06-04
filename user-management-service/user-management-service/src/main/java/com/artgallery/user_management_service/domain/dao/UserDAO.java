package com.artgallery.user_management_service.domain.dao;

import com.artgallery.user_management_service.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserDAO {
    List<User> findAll();
    Optional<User> findById(Long id);
    User save(User user);
    void deleteById(Long id);
    Optional<User> findByUsername(String username);
}
