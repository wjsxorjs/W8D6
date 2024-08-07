"use client"

import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Divider, FormControl, OutlinedInput } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function page(props) {

    const b_idx = props.params.b_idx;
    const nowPage = props.searchParams.nowPage;
    

    const [bvo, setBvo] = useState({});
    const [prevCont, setPrevContent] = useState(null);
    const [content, setContent] = useState(null);
    const [file, setFile] = useState(null);

    function getData(){
        axios.get(
            API_URL,
            {params:{"b_idx":b_idx}}
        ).then((res)=>{
            setBvo(res.data.bvo);
            setPrevContent(res.data.bvo.content);
        });
    }

    function sendData(){
        
        const frm = new FormData();

        let chk = true;
        frm.append("b_idx",b_idx);
        if(content != null && content != prevCont){
            frm.append("content", content);
            chk = false;
        }
        if(file != null){
            frm.append("file", file);
            chk = false;
        }
        if(chk){
            alert("수정된 사항이 없습니다.");
            return;
        }
        axios.post(
            "/api/bbs/edit",
            frm,
            {headers:{'Content-Type':'multipart/form-data'}}
          ).then((res)=>{
            console.log(res);
            if(res.data.result == 1){
              alert("수정 완료!");
                router.push(`/bbs/detail/${b_idx}`);
            }
          });
        
        
    }

    useEffect(()=>{
        getData();
    },[b_idx]);

    const API_URL = "/api/bbs/getBbs";

    const router = useRouter();

    return (
        <div style={{width:'70%', margin:'10px auto'}}>
            <Card style={{width:'700px', margin:'20px auto'}}>
                <CardContent>
                    <header>
                        <h2>게시글 수정</h2>
                    </header>
                    <div style={{marginTop:'20px'}}>
                      <FormControl style={{width:'80%'}}>
                        <input type='hidden' name='b_idx' value={b_idx}/><br/>
                        <p>제목: <strong style={{fontSize:'20px'}}>{bvo.subject}</strong></p>
                        <Divider/>
                        <p>작성자: <strong style={{fontSize:'20px'}}>{bvo.writer}</strong></p>
                        <Divider/>
                        내용: <OutlinedInput id='content' name='content' onChange={(e)=>{setContent(e.target.value)}} defaultValue={bvo.content}/>
                        <Divider/>
                        <input style={{margin:'10px 0'}} type='file' name='file' id='file' defaultValue={bvo.file} onChange={(e)=>{setFile(e.target.files[0])}/*uploadFile*/} />
                        {bvo.file_name != null ? <p>현재 {bvo.file_name} 첨부 중</p> : null}
                        <Divider style={{marginBottom:'10px'}}/>
                      </FormControl>
                      <div>
                        <Button type='button' onClick={sendData} variant="contained">수정</Button>
                        <Button onClick={()=>router.push(`/bbs/detail/${b_idx}?nowPage=${nowPage}`)} style={{margin:'0 0 0 10px'}} variant="contained" color='error'>취소</Button>
                      </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
