package com.it.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.it.api.domain.dto.UserMsg;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMsgMapper extends BaseMapper<UserMsg> {
}
