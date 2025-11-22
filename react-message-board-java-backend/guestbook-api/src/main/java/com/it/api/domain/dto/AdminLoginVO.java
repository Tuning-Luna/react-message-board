package com.it.api.domain.dto;

import lombok.Data;

@Data
public class AdminLoginVO {
    private Integer userId;
    private String username;
    private String token; // JWT token
}
