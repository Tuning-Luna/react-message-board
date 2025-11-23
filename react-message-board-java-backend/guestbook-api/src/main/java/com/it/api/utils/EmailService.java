// D:\ideaproject\GuestbookSystem\admin-service\src\main\java\com\it\admin\service\EmailService.java
package com.it.api.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    
    private final JavaMailSender mailSender;
    private final String fromEmail = "1759751014@qq.com";  // 发件人邮箱，应与配置文件一致
    
    /**
     * 发送留言回复通知邮件
     * @param to 收件人邮箱
     * @param nickname 留言者昵称
     * @param title 留言标题
     * @param reply 回复内容
     */
    public void sendReplyNotification(String to, String nickname, String title, String reply) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("您的留言有新回复：" + title);
        message.setText("尊敬的" + nickname + "：\n\n" +
                       "您的留言《" + title + "》已收到管理员回复：\n" +
                       "\n" + reply + "\n\n" +
                       "感谢您的留言！\n" +
                       "-- 留言簿系统");
        
        try {
            mailSender.send(message);
        } catch (Exception e) {
            // 记录邮件发送失败日志，但不影响主业务流程
            System.err.println("邮件发送失败: " + e.getMessage());
        }
    }
}