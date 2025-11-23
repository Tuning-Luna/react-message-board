package com.it.api.domain.dto;

import lombok.Data;

@Data
public class PageParam {
    private Integer page =1;
    private Integer pageSize =10;
    private String keyword;
    private String sort = "newest";
}
