package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.notice.NoticeViewDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface NoticeService {
    Long getCountNotice(HttpServletRequest request);

    List<NoticeViewDto> getNoticeList(HttpServletRequest request);

    boolean readNotice(HttpServletRequest request, Integer idx);

    boolean deleteNotice(HttpServletRequest request, Integer idx);
}
