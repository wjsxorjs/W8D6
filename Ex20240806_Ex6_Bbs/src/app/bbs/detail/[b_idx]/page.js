"use client"

import { Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page(props) {
    console.log(props);

    const b_idx = props.params.b_idx;
    const nowPage = props.searchParams.nowPage;

    const API_URL = "/api/bbs/getBbs";

    const [bvo, setBvo] = useState({});

    const router = useRouter();

    useEffect(()=>{
        axios.get(
            API_URL,
            {params:{"b_idx":b_idx}}
        ).then((res)=>{
            console.log(res.data.bvo.c_list);
            setBvo(res.data.bvo);
        })
    },[b_idx]);

    return (
        <div style={{width: '70%', margin: '10px auto'}}>
            <Card style={{width:'700px', margin: '20px auto',}}>
                <CardContent>
                    <header>
                        <h2>게시판 상세보기{props.params.bidx}</h2>
                    </header>
                    <div>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="customized table">
                        <TableBody>
                        <TableRow>
                            <TableCell align="right">제목</TableCell>
                            <TableCell align="left" colSpan={3}>{bvo.subject}</TableCell>
                            <TableCell align="right">첨부파일</TableCell>
                            <TableCell align="left">{bvo.file_name}</TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell align="right">글쓴이</TableCell>
                            <TableCell align="right">{bvo.writer}</TableCell>
                            <TableCell align="right">등록일</TableCell>
                            <TableCell align="right">{bvo.write_date}</TableCell>
                            <TableCell align="right">조회수</TableCell>
                            <TableCell align="center">{bvo.hit}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">내용</TableCell>
                            <TableCell align="left" colSpan={5} dangerouslySetInnerHTML={{__html: bvo.content}} />
                            
                        </TableRow>
                        <TableRow>
                            <TableCell align="left" colSpan={6}>
                <Button variant="contained" color="success" onClick={()=>router.push(`/bbs/edit/${bvo.b_idx}?nowPage=${nowPage}`)}>편집</Button>
                <Button variant="contained" style={{margin:'0 0 0 10px'}} onClick={()=>router.push(`/bbs?nowPage=${nowPage}`)}>목록</Button>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="customized table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">작성자</TableCell>
                                <TableCell align="left">댓글</TableCell>
                                <TableCell align="left">작성일</TableCell>
                            </TableRow>
                        {(bvo.c_list != null && bvo.c_list != undefined) ? 
                            (bvo.c_list.length>0 ? 
                                bvo.c_list.map((cvo,idx)=>{
                                    return(
                                    <TableRow key={idx}>
                                        <TableCell align="left">{cvo.writer}</TableCell>
                                        <TableCell align="left">{cvo.content}</TableCell>
                                        <TableCell align="left">{cvo.write_date}</TableCell>
                                    </TableRow>
                        )}):null):null}
                        </TableBody>
                    </Table>
                </TableContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
