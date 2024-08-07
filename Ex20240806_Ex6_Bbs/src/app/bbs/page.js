"use client"

import BbsList from '@/component/bbs/BbsList'
import { Card, CardContent } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function page(props) {

    const API_URL = "/api/bbs/list";
    let nPage = 1;
    if(props.searchParams.nowPage != undefined){
        nPage = props.searchParams.nowPage;
    }

    // Spring 서버로부터 받은 자원들을 저장할 곳
    const [b_ar, setB_ar] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRecord, setTotalRecord] = useState(0);
    const [cPage, setCPage] = useState(0);
    const [numPerPage, setNumPerPage] = useState(0);
    const [nowPage, setNowPage] = useState(nPage);

    function callData(){
        axios.get(
            API_URL,
            {params:{cPage:nowPage,bname: 'bbs'}}
        ).then((json)=>{
            setB_ar(json.data.b_ar);
            setTotalPage(json.data.totalPage);
            setNowPage(json.data.nowPage);
            setTotalRecord(json.data.totalRecord);
            setCPage(json.data.nowPage);
            setNumPerPage(json.data.numPerPage);
        });
    }

    useEffect(()=>{
        callData();
    },[nowPage]);

    function changePage(e){
        setNowPage(e.target.innerText);
    }
      
    return (
        <div style={{width:'70%', margin:'10px auto'}}>
            <Card style={{width:'700px', margin:'20px auto'}}>
                <CardContent>
                    <header>
                        <h2>게시판</h2>
                    </header>
                    <div>
                        <BbsList b_ar={b_ar} changePage={changePage}
                                 totalPage={totalPage} nowPage={nowPage}
                                 totalRecord={totalRecord} cPage={cPage}
                                 numPerPage={numPerPage} />
                    </div>
                </CardContent>
            </Card>
            
        </div>
    )
}
