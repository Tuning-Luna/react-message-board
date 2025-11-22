package com.it.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it.api.domain.dto.AdminMsg;
import com.it.user.mapper.AdminMsgMapper;
import com.it.user.service.IAdminMsgService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminMsgServiceImpl extends ServiceImpl<AdminMsgMapper, AdminMsg> implements IAdminMsgService {
    @Override
    public List<String> getListByUserId(Integer id) {
        return baseMapper.selectList(new LambdaQueryWrapper<AdminMsg>().eq(AdminMsg::getUserMsgId, id))
                .stream()
                .map(AdminMsg::getReply)
                .collect(Collectors.toList());
    }
}
