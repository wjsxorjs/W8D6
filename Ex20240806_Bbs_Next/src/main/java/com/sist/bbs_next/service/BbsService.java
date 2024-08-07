package com.sist.bbs_next.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.bbs_next.mapper.BbsMapper;
import com.sist.bbs_next.vo.BbsVO;

@Service
public class BbsService {
    
    @Autowired
    private BbsMapper b_mapper;

    public int count(String bname, String searchType, String searchValue){
        return b_mapper.count(bname, searchType, searchValue);
    }

    public BbsVO[] bbsList(String bname, String searchType, String searchValue, int begin, int end){
        BbsVO[] b_ar = null;

        List<BbsVO> b_list = b_mapper.bbsList(bname, searchType, searchValue, begin, end);

        if(b_list != null && b_list.size()>0){
            b_ar = new BbsVO[b_list.size()];
            b_list.toArray(b_ar);
        }

        return b_ar;
    }

    public BbsVO getBbs(String b_idx){
        return b_mapper.getBbs(b_idx);
    }

    public int add(BbsVO bvo){
        return b_mapper.add(bvo);
    }

    public int hit(String b_idx){
        return b_mapper.hit(b_idx);
    }


}
