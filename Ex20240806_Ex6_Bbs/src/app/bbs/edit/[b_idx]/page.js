"use client"

import { Button, Card, CardContent, Divider } from '@mui/material'
import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

export default function page(props) {

    const b_idx = props.params.b_idx;
    const nowPage = props.searchParams.nowPage;

    const [bvo, setBvo] = useState({});

    function getData(){
        axios.get(
            API_URL,
            {params:{"b_idx":b_idx}}
        ).then((res)=>{
            setBvo(res.data.bvo);
        });
    }

    function sendData(){
        let frm = document.forms[0];
        let content = frm.content.value.trim();
        if(content == null || content.length == 0){
            alert("내용은 빈칸일 수 없습니다.");
            frm.content.value="";
            frm.content.focus();
            return;
        }

    }

    useEffect(()=>{
        getData();
    },[b_idx]);

    const API_URL = "/api/bbs/getBbs";

    const router = useRouter();

    return (
        <Card sx ={{maxWidth: 500, padding:'20px', margin: '20px auto'}}>
            <CardContent>
                <h1>글 수정</h1>
                <Divider sx={{margin: '15px auto'}}/>
                <form action='/api/post/edit' method='post'>
                    <input type='hidden' name='b_idx' value={b_idx}/><br/>
                    제목: <input type='text' style={{padding: 5, width: 150, margin: '5px 0', border: 'none'}} name='subject' readOnly defaultValue={bvo.subject}/><br/>
                    내용: <input type='text' style={{padding: 5, width: 150, margin: '5px 0'}} name='content' defaultValue={bvo.content}/><br/>
                    작성자: <input type='text' style={{padding: 5, width: 150, margin: '5px 0', border: 'none'}} name='writer' readOnly defaultValue={bvo.writer}/><br/>
                    <Button type='button' onClick={sendData} variant="contained">수정</Button>
                    <Button onClick={()=>router.push(`/bbs/detail/${b_idx}?nowPage=${nowPage}`)} style={{margin:'0 0 0 10px'}} variant="contained" color='error'>취소</Button>
                </form>
            </CardContent>
        </Card>
    )
}
