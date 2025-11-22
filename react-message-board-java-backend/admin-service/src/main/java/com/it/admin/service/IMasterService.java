package com.it.admin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.it.api.domain.dto.AdminLoginVO;
import com.it.api.domain.dto.Master;

public interface IMasterService extends IService<Master> {
    AdminLoginVO login(Master loginDTO);
}
