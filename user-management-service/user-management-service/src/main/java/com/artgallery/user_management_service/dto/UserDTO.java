package com.artgallery.user_management_service.dto;

import com.artgallery.user_management_service.domain.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private UserRole role;
}
