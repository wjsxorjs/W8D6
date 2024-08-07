'use client'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Divider, FormControl, OutlinedInput } from '@mui/material'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function page() {
  const router = useRouter();

  const [subject, setSubject] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  // const UPLOAD_URL = "/public/upload/"

  function uploadFile(e){
    let file = e.target.files[0];
    setFile(file);
  }

  const API_URL = "/api/bbs/write"

  const sendData = (e) => {
    // console.log(e.target.parentElement.previousSibling.children[0].children[0].value);
    // console.log(e.target.parentElement.previousSibling.children[2].children[0].value);
    // console.log(e.target.parentElement.previousSibling.children[4].children[0].value);
 
    axios.post(
      API_URL,
      {
        "subject": subject,
        "writer": writer,
        "content": content,
        "file": file,
        "bname": "bbs"
      },
      {headers:{'Content-Type':'multipart/form-data'}}
    ).then((res)=>{
      console.log(res);
      if(res.data.result == 1){
        alert("저장 완료!");
        router.push("/bbs");
      }
    });

  };

  return (
    <div style={{width:'70%', margin:'10px auto'}}>
        <Card style={{width:'700px', margin:'20px auto'}}>
            <CardContent>
                <header>
                    <h2>게시판 글쓰기</h2>
                </header>
                <div style={{marginTop:'20px'}}>
                  <FormControl style={{width:'80%'}}>
                    <OutlinedInput id='subject' onChange={(e)=>{setSubject(e.target.value)}} name='subject' placeholder='제목'/>
                    <Divider/>
                    <OutlinedInput id='writer' onChange={(e)=>{setWriter(e.target.value)}} name='writer' placeholder='작성자'/>
                    <Divider/>
                    <OutlinedInput id='content' onChange={(e)=>{setContent(e.target.value)}} name='content' placeholder='내용'/>
                    <Divider/>
                    <input style={{margin:'10px 0'}} type='file' name='file' id='file' onChange={/*(e)=>{setFile(e.target.value)}*/uploadFile} />
                    <Divider style={{marginBottom:'10px'}}/>
                  </FormControl>
                  <div>
                    <Button variant='contained' onClick={sendData}>저장</Button>
                    <Button variant='contained' color='error' style={{margin:'0 0 0 10px'}} onClick={()=>router.push(`/bbs`)}>취소</Button>
                  </div>
                </div>
            </CardContent>
        </Card>
        
    </div>
  )
}
