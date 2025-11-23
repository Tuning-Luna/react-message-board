package com.it.admin.controller;

import com.it.admin.service.IMasterService;
import com.it.api.client.AdminMsgClient;
import com.it.api.domain.dto.AdminLoginVO;
import com.it.api.domain.dto.AdminMsg;
import com.it.api.domain.dto.Master;
import com.it.api.domain.vo.UserVO;
import com.it.api.utils.EmailService;
import com.it.api.vo_utils.Result;

import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminMsgClient adminMsgService;
    private final EmailService emailService;
    private final IMasterService masterService;

    // 管理员通过QQ回复用户留言
// 管理员通过QQ回复用户留言
    @PostMapping("/messages/{id}/reply")
    public Result<List<String>> getListByUserId(@PathVariable("id") Integer id,@RequestBody AdminMsg adminMsg) {
        // 尝试获取用户消息信息
        adminMsg.setUserMsgId(id);
        adminMsgService.saveReplyMessage(id, adminMsg);
        Result<UserVO> result = adminMsgService.showMessage(id);
        String email = null;
        String nickname = null;
        String title = null;

        // 正确使用UserVO类型而不是当作Map
        if (result.getCode() == 1 && result.getData() != null) {
            UserVO userVO = result.getData();
            email = userVO.getEmail();
            nickname = userVO.getNickname();
            title = userVO.getTitle();
        }

        // 如果有邮箱，则发送通知
        try {
            // 添加完整的非空检查
            if (StringUtils.hasText(email) && StringUtils.hasText(nickname) &&
                    StringUtils.hasText(title) && StringUtils.hasText(adminMsg.getReply())) {
                emailService.sendReplyNotification(email, nickname, title, adminMsg.getReply());
                return Result.success();
            } else {
                return Result.error("用户信息不完整");
            }
        } catch (Exception e) {
            // 记录错误但不影响主流程
            System.err.println("获取用户信息或发送邮件失败: " + e.getMessage());
            return Result.error("获取用户信息或发送邮件失败: " + e.getMessage());
        }
    }
    @DeleteMapping("/messages/{id}")
    public Result<?> adminDeleteReplyMessage(@PathVariable("id") Integer id) {
        try {
            // 获取Feign调用的返回结果
            Result<?> result = adminMsgService.deleteReplyMessage(id);

            // 检查结果是否成功，如果不成功则返回错误信息
            if (result.getCode() != 1) {  // 假设1表示成功，具体取决于Result的实现
                return result;  // 直接返回user-service提供的错误信息
            }

            return Result.success();
        } catch (Exception e) {
            // 记录异常日志
            System.err.println("删除消息时发生错误: " + e.getMessage());
            return Result.error("删除失败: " + e.getMessage());
        }
    }









    // 管理员登录
    @PostMapping("/login")
    public Result<AdminLoginVO> login(@RequestBody Master master) {
        try {
            AdminLoginVO adminLoginVO = masterService.login(master);
            return Result.success(adminLoginVO);
        } catch (Exception e) {
            return Result.error("用户名或密码错误");
        }
    }

}
