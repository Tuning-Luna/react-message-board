package com.it.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.it.api.domain.dto.AdminMsg;
import com.it.api.domain.dto.PageParam;
import com.it.api.domain.dto.UserMsg;
import com.it.api.domain.vo.UserVO;
import com.it.api.vo_utils.PageResult;

import java.util.List;

public interface IUserMsgService extends IService<UserMsg> {

    UserVO convertToUserVO(UserMsg userMsg, List<String> replyList);

    PageResult<UserVO> queryMessages(PageParam pageParam);

    void likeMessage(Integer id);
}
