package com.sist.bbs_next.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.sist.bbs_next.util.FileRenameUtil;
import com.sist.bbs_next.util.Paging2;
import com.sist.bbs_next.service.BbsService;
import com.sist.bbs_next.vo.BbsVO;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ResponseBody;


@RestController
@RequestMapping("/api/bbs")
public class BbsController {

    @Autowired
    private BbsService b_service;

    @Autowired
    private ServletContext application;
    @Autowired
    private HttpServletRequest request;
    
    @Value("${server.upload}")
    private String upload_path; // 첨부파일 추가할 때 저장할 위치

    @RequestMapping("list")
    @ResponseBody
    public Map<String, Object> bbsList(String bname,String searchType, String searchValue, String cPage) {
        Map<String,Object> b_map = new HashMap<>();
        int nowPage = 1;

        if(cPage != null){
            nowPage = Integer.parseInt(cPage);
        }

        if(bname == null || bname.trim().length()==0){
            bname = "bbs";
        }

        int totalRecord = b_service.count(bname, searchType, searchValue);

        // 위에서 전체 게시물의 수를 얻었다면 이제 페이징 기법을
        // 사용하는 객체를 생성할 수 있다.
        Paging2 page = new Paging2(5, 3, totalRecord, nowPage, bname);

        nowPage = page.getNowPage();

        // 페이징기법의 HTML코드를 얻어낸다.
        String pageCode = page.getSb().toString();

        // 뷰 페이지에서 표현할 목록 가져오기
        int begin = page.getBegin();
        int end = page.getEnd();

        BbsVO[] b_ar = b_service.bbsList(bname, searchType, searchValue, begin, end);

        b_map.put("b_ar", b_ar);
        b_map.put("nowPage", nowPage);
        b_map.put("totalRecord", totalRecord);
        b_map.put("bname", bname);
        b_map.put("totalPage", page.getTotalPage());
        b_map.put("pagePerBlock", page.getPagePerBlock());
        b_map.put("numPerPage", page.getNumPerPage());

        return b_map;
    }
    
    @RequestMapping("getBbs")
    @ResponseBody
    public Map<String, Object> getBbs(String b_idx) {
        Map<String,Object> b_map = new HashMap<>();

        BbsVO bvo = b_service.getBbs(b_idx);

        b_map.put("bvo", bvo);

        return b_map;
    }

    
    @RequestMapping("write")
    public Map<String, Object> write(BbsVO bvo) {
        Map<String, Object> w_map = new HashMap<>();

        MultipartFile file = bvo.getFile();

        // 파일이 첨부되지 않았다고 해도 file은 null이 아니다.
        // 그러므로 null과 비교하는 것이 아닌 용량으로 확인해야한다.
        if(file.getSize()>0){
            String realPath = application.getRealPath(upload_path);

            File ff = new File(realPath);
            if(!ff.exists()){
                ff.mkdirs();
            }

            String oname = file.getOriginalFilename();
            bvo.setOri_name(oname);

            String fname = FileRenameUtil.checkSameFileName(oname, realPath);
            

            try {
                file.transferTo(new File(realPath, fname));
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            // 여기까지 서버에 업로드를 수행한 것이다.
            // 이제 DB에 저장하는 일을 하자.
            bvo.setFile_name(fname);

        }
        
        bvo.setIp(request.getRemoteAddr());

        // 필요한 내용 추가 완료 후
        // DB에 저장
        int result = b_service.add(bvo);

        w_map.put("result", result);

        return w_map;
    }

    
    @RequestMapping("add")
    @ResponseBody
    public Map<String, Object> add(BbsVO bvo) {
        Map<String, Object> w_map = new HashMap<>();
        
        
        bvo.setIp(request.getRemoteAddr());

        // 필요한 내용 추가 완료 후
        // DB에 저장
        int result = b_service.add(bvo);


        w_map.put("result", result);
        w_map.put("bvo", bvo);

        return w_map;
    }

    @RequestMapping("addFile")
    @ResponseBody
    public Map<String, Object> addFile(BbsVO bvo) {
        Map<String, Object> w_map = new HashMap<>();

        MultipartFile file = bvo.getFile();

        // 파일이 첨부되지 않았다고 해도 file은 null이 아니다.
        // 그러므로 null과 비교하는 것이 아닌 용량으로 확인해야한다.
        if(file.getSize()>0){
            String realPath = application.getRealPath(upload_path);

            File ff = new File(realPath);
            if(!ff.exists()){
                ff.mkdirs();
            }

            String oname = file.getOriginalFilename();
            bvo.setOri_name(oname);


            String fname = FileRenameUtil.checkSameFileName(oname, realPath);
            

            try {
                file.transferTo(new File(realPath, fname));
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            // 여기까지 서버에 업로드를 수행한 것이다.
            // 이제 DB에 저장하는 일을 하자.
            bvo.setFile_name(fname);

        }
        
        bvo.setIp(request.getRemoteAddr());

        // 필요한 내용 추가 완료 후
        // DB에 저장
        int result = b_service.addFile(bvo);

        w_map.put("result", result);

        return w_map;
    }
    
    @RequestMapping("edit")
    @ResponseBody
    public Map<String, Object> edit(BbsVO bvo) {

        Map<String, Object> w_map = new HashMap<>();

        MultipartFile file = bvo.getFile();

        // 파일이 첨부되지 않았다고 해도 file은 null이 아니다.
        // 그러므로 null과 비교하는 것이 아닌 용량으로 확인해야한다.
        if(file != null && file.getSize()>0){
            String realPath = application.getRealPath(upload_path);

            File ff = new File(realPath);
            if(!ff.exists()){
                ff.mkdirs();
            }

            String oname = file.getOriginalFilename();
            bvo.setOri_name(oname);


            String fname = FileRenameUtil.checkSameFileName(oname, realPath);
            

            try {
                file.transferTo(new File(realPath, fname));
            } catch (Exception e) {
                e.printStackTrace();
            }
            
            // 여기까지 서버에 업로드를 수행한 것이다.
            // 이제 DB에 저장하는 일을 하자.
            bvo.setFile_name(fname);

        }
        
        bvo.setIp(request.getRemoteAddr());

        // 필요한 내용 추가 완료 후
        // DB에 저장
        int result = b_service.edit(bvo);

        w_map.put("result", result);

        return w_map;
    }

}
