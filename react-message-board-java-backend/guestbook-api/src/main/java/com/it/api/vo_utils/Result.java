package com.it.api.vo_utils;

import lombok.Data;

@Data
public class Result<T> {
    private Integer code;
    private String msg;
    private T data;

    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.setCode(1);
        result.setMsg("操作成功");
        result.setData(data);
        return result;
    }
    public static Result success() {
        Result result = new Result<>();
        result.setCode(1);
        result.setMsg("操作成功");
        return result;
    }
    public static <T> Result<T> error(String msg) {
        Result<T> result = new Result<>();
        result.setCode(0);
        result.setMsg(msg);
        return result;
    }
}
