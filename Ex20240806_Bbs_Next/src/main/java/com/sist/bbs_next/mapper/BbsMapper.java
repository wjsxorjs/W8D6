package com.sist.bbs_next.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.bbs_next.vo.BbsVO;

@Mapper
public interface BbsMapper {
    int count(String bname, String searchType, String searchValue);

    List<BbsVO> bbsList(String bname, String searchType, String searchValue, int begin, int end);
    
    BbsVO getBbs(String b_idx);

    int add(BbsVO bvo);

    int hit(String b_idx);
    
    int edit(String content, String b_idx);

}
