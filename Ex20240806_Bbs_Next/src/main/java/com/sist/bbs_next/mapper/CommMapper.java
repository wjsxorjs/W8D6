package com.sist.bbs_next.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.bbs_next.vo.CommVO;

@Mapper
public interface CommMapper {

    List<CommVO> commList(String b_idx);

    int commAdd(CommVO cvo);

}
