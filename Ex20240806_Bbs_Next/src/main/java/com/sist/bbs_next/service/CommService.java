package com.sist.bbs_next.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.bbs_next.mapper.CommMapper;
import com.sist.bbs_next.vo.CommVO;

@Service
public class CommService {
    
    @Autowired
    CommMapper c_mapper;

    public CommVO[] commList(String b_idx){
        CommVO[] c_ar = null;

        List<CommVO> c_list = c_mapper.commList(b_idx);
        if(c_list != null && c_list.size()>0){
            c_ar = new CommVO[c_list.size()];
            c_list.toArray(c_ar);
        }

        return c_ar;
    }

}
