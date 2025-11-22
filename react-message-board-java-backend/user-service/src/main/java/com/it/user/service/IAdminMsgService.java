package com.it.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.it.api.domain.dto.AdminMsg;

import java.util.List;

public interface IAdminMsgService extends IService<AdminMsg> {
    List<String> getListByUserId(Integer id);
}
