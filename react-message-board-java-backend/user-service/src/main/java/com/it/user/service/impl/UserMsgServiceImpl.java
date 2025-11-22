package com.it.user.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it.api.domain.dto.AdminMsg;
import com.it.api.domain.dto.PageParam;
import com.it.api.domain.dto.UserMsg;
import com.it.api.domain.vo.UserVO;
import com.it.api.vo_utils.PageResult;
import com.it.user.mapper.AdminMsgMapper;
import com.it.user.mapper.UserMsgMapper;
import com.it.user.service.IUserMsgService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserMsgServiceImpl extends ServiceImpl<UserMsgMapper, UserMsg> implements IUserMsgService {

    private final UserMsgMapper userMsgMapper;
    private final AdminMsgMapper adminMsgMapper;

    @Override
    public UserVO convertToUserVO(UserMsg userMsg, List<String> replyList) {
        UserVO userVO = new UserVO();
        // 手动设置属性，避免BeanUtil.copyProperties可能带来的编码问题
        userVO.setId(userMsg.getId());
        userVO.setNickname(userMsg.getNickname());
        userVO.setEmail(userMsg.getEmail());
        userVO.setTitle(userMsg.getTitle());
        userVO.setContent(userMsg.getContent());
        userVO.setLikes(userMsg.getLikes());
        userVO.setCreatedAt(userMsg.getCreatedAt());
        if (replyList != null) {
            userVO.setReply(replyList);
        }
        return userVO;
    }

    @Override
    public PageResult<UserVO> queryMessages(PageParam pageParam) {
        // 创建一个集合用于存储满足条件的消息ID（求并集）
        Set<Integer> msgIds = new HashSet<>();

        String keyword = pageParam.getKeyword();
        if (StrUtil.isNotBlank(keyword)) {
            // 根据内容和标题和昵称查找用户id
            LambdaQueryWrapper<UserMsg> wrapper = new LambdaQueryWrapper<UserMsg>()
                    .like(UserMsg::getContent, keyword)
                    .or().like(UserMsg::getTitle, keyword)
                    .or().like(UserMsg::getNickname, keyword);
            List<UserMsg> userList = userMsgMapper.selectList(wrapper);
            msgIds.addAll(userList.stream().map(UserMsg::getId).collect(Collectors.toSet()));

            // 根据管理员回复内容查找用户id
            LambdaQueryWrapper<AdminMsg> adminWrapper = new LambdaQueryWrapper<AdminMsg>()
                    .like(AdminMsg::getReply, keyword);
            List<AdminMsg> adminList = adminMsgMapper.selectList(adminWrapper);
            msgIds.addAll(adminList.stream().map(AdminMsg::getUserMsgId).collect(Collectors.toSet()));
        }
        else{
            // 关键词为空时，获取所有消息的ID
            LambdaQueryWrapper<UserMsg> allWrapper = new LambdaQueryWrapper<>();
            List<UserMsg> allMsgList = userMsgMapper.selectList(allWrapper);
            msgIds.addAll(allMsgList.stream().map(UserMsg::getId).collect(Collectors.toSet()));
        }
        // 查到所有信息的id了，然后反用这些id去查用户信息
        List<UserMsg> msgList = new ArrayList<>();
        Map<Integer, List<String>> userMsgIdToRepliesMap = new HashMap<>();

        if (!msgIds.isEmpty()) {
            LambdaQueryWrapper<UserMsg> msgWrapper = new LambdaQueryWrapper<>();
            msgWrapper.in(UserMsg::getId, msgIds);
            msgList = userMsgMapper.selectList(msgWrapper);


            // 1. 构造查询条件
            LambdaQueryWrapper<AdminMsg> queryWrapper = new LambdaQueryWrapper<AdminMsg>()
                    // 同时选择 UserMsgId 和 Reply 两个字段，以便后续分组
                    .select(AdminMsg::getUserMsgId, AdminMsg::getReply)
                    // 使用 .in 条件过滤指定 msgIds
                    .in(AdminMsg::getUserMsgId, msgIds);


            // 2. 执行查询，返回 AdminMsg 对象的列表
            List<AdminMsg> adminMsgList = adminMsgMapper.selectList(queryWrapper);
            // 3. 使用 Stream API 对结果进行分组 (一键多值)
            // 分组管理员回复
            if (!adminMsgList.isEmpty()) {
                userMsgIdToRepliesMap.putAll(
                        adminMsgList.stream()
                                .collect(Collectors.groupingBy(
                                        AdminMsg::getUserMsgId,
                                        HashMap::new,
                                        Collectors.mapping(AdminMsg::getReply, Collectors.toList())
                                ))
                );

            }

        }
        List<UserVO> userVOList = msgList.stream()
                .map(msg -> convertToUserVO(
                        msg,
                        userMsgIdToRepliesMap.getOrDefault(msg.getId(), Collections.emptyList())
                ))
                .collect(Collectors.toList());

        String sort = pageParam.getSort();
        if (StrUtil.isBlank(sort) || "newest".equalsIgnoreCase(sort)) {
            // newest：按创建时间倒序
            userVOList.sort(Comparator.comparing(UserVO::getCreatedAt).reversed());
        } else if ("mostLiked".equalsIgnoreCase(sort)) {
            // mostLiked：按点赞倒序
            userVOList.sort(Comparator.comparing(UserVO::getLikes).reversed());
        }

        // 构建并返回PageResult对象
        PageResult<UserVO> result = new PageResult<>();
        result.setList(userVOList);
        result.setTotal(userVOList.size());
        result.setPage(pageParam.getPage());
        result.setPageSize(pageParam.getPageSize());

        return result;
    }

    @Override
    public void likeMessage(Integer id) {
        // 1. 检查消息是否存在
        UserMsg userMsg = userMsgMapper.selectById(id);
        if (userMsg == null) {
            throw new IllegalArgumentException("消息不存在");
        }
        // 2. 增加点赞数
        userMsg.setLikes(userMsg.getLikes() + 1);
        // 3. 更新数据库
        userMsgMapper.updateById(userMsg);
    }
}



