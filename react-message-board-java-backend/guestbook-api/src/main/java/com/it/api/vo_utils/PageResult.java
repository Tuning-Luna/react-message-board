package com.it.api.vo_utils;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class PageResult <T> {
    private Integer total;
    private Integer page;
    private Integer pageSize;
    private List<T> list;
}
