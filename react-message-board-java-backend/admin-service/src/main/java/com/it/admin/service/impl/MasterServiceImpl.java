package com.it.admin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.it.admin.config.JwtProperties;
import com.it.admin.mapper.MasterMapper;
import com.it.admin.service.IMasterService;
import com.it.admin.utils.JwtTool;
import com.it.api.domain.dto.AdminLoginVO;
import com.it.api.domain.dto.Master;
import com.it.api.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MasterServiceImpl extends ServiceImpl<MasterMapper, Master> implements IMasterService {
    private final JwtTool jwtTool;
    private final JwtProperties jwtProperties;

    @Override
    public AdminLoginVO login(Master loginDTO) {
        // 1. 根据用户名查询管理员
        QueryWrapper<Master> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", loginDTO.getUsername());
        Master master = getOne(queryWrapper);

        // 2. 验证管理员是否存在
        if (master == null) {
            throw new UnauthorizedException("用户名或密码错误");
        }

        // 3. 验证密码（这里应该使用加密密码，示例中直接比对）
        // 注意：实际项目中应该使用BCrypt等算法加密密码
        if (!master.getPassword().equals(loginDTO.getPassword())) {
            throw new UnauthorizedException("用户名或密码错误");
        }

        // 4. 生成JWT token
        String token = jwtTool.createToken(master.getId(), jwtProperties.getTokenTTL());

        // 5. 封装返回数据
        AdminLoginVO vo = new AdminLoginVO();
        vo.setUserId(master.getId());
        vo.setUsername(master.getUsername());
        vo.setToken(token);

        return vo;
    }
}

