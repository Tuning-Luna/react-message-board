package com.it.api.client;

import com.it.api.domain.dto.AdminMsg;
import com.it.api.domain.dto.UserMsg;
import com.it.api.domain.vo.UserVO;
import com.it.api.vo_utils.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;


@FeignClient(name = "user-service") // 指定服务名称
public interface AdminMsgClient {

    @PostMapping("/api/messages/{id}/reply")
    Result<?> saveReplyMessage(@PathVariable("id") Integer id, @RequestBody AdminMsg adminMsg);

    @DeleteMapping("/api/messages/{id}")
    Result<?> deleteReplyMessage(@PathVariable("id") Integer id);

    @GetMapping("/api/messages/{id}")
    Result<UserVO> showMessage(@PathVariable("id") Integer id);

}