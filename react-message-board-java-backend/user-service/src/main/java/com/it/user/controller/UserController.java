package com.it.user.controller;

import com.it.api.domain.dto.AdminMsg;
import com.it.api.domain.dto.PageParam;
import com.it.api.domain.dto.UserMsg;
import com.it.api.domain.vo.UserVO;
import com.it.api.vo_utils.PageResult;
import com.it.api.vo_utils.Result;
import com.it.user.service.IAdminMsgService;
import com.it.user.service.IUserMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final IUserMsgService userMsgService;
    private final IAdminMsgService adminMsgService;

    // 用户分页查询所有留言
    @GetMapping("/messages")
    public Result<PageResult<UserVO>> showMessages(@ModelAttribute PageParam pageParam) {
        try {
            // 调用服务层查询消息列表
            PageResult<UserVO> pageResult = userMsgService.queryMessages(pageParam);
            // 返回成功结果
            return Result.success(pageResult);
        } catch (Exception e) {
            // 异常处理
            return Result.error("查询消息失败：" + e.getMessage());
        }
    }

    // 指定id查询留言
    @GetMapping("/messages/{id}")
    public Result<UserVO> showMessage(@PathVariable Integer id) {
        try {
            // 调用服务层查询消息详情
            UserMsg userMsg = userMsgService.getById(id);
            if (userMsg == null) {
                return Result.error("消息不存在");
            }
            List<String> replyList = adminMsgService.getListByUserId(id);
            // 返回成功结果
            return Result.success(userMsgService.convertToUserVO(userMsg, replyList));
        } catch (Exception e) {
            // 异常处理
            return Result.error("查询消息失败：" + e.getMessage());
        }
    }

    // 数据库加入用户信息
    @PostMapping("/messages")
    public Result<?> addMessage(@RequestBody UserMsg userMsg) {
        try {
            // 调用服务层添加消息
            userMsgService.save(userMsg);
            // 返回成功结果
            return Result.success();
        } catch (Exception e) {
            // 异常处理
            return Result.error("添加消息失败：" + e.getMessage());
        }
    }

    // 用户点赞留言
    @PostMapping("/messages/{id}/like")
    public Result<?> likeMessage(@PathVariable Integer id) {
        try {
            // 调用服务层点赞消息
            userMsgService.likeMessage(id);
            // 返回成功结果
            return Result.success();
        } catch (Exception e) {
            // 异常处理
            return Result.error("点赞消息失败：" + e.getMessage());
        }
    }




    @PostMapping("/messages/{id}/reply")
    public Result<?> saveReplyMessage(@PathVariable("id") Integer id, @RequestBody AdminMsg adminMsg) {
        adminMsg.setUserMsgId(id);
        adminMsgService.save(adminMsg);
        return Result.success();
    }
    @DeleteMapping("/messages/{id}")
    public Result<?> deleteReplyMessage(@PathVariable("id") Integer id) {
        // 1. 输入参数验证
        if (id == null || id <= 0) {
            return Result.error("无效的消息ID");
        }

        try {
            // 2. 检查消息是否存在
            UserMsg userMsg = userMsgService.getById(id);
            if (userMsg == null) {
                return Result.error("消息不存在或已被删除"); // 返回友好错误信息而非抛出异常
            }

            // 3. 执行删除操作
            boolean deleted = userMsgService.removeById(id);
            if (deleted) {
                return Result.success("删除成功");
            } else {
                return Result.error("删除失败，请重试");
            }
        } catch (Exception e) {
            // 4. 全局异常捕获
            // 记录异常日志
            System.err.println("删除消息时发生错误: " + e.getMessage());
            // 返回通用错误信息，避免暴露系统细节
            return Result.error("系统异常，请稍后重试");
        }
    }

}