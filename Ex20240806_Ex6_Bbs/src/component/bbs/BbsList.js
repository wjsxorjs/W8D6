import { Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BbsList({b_ar, changePage, totalPage, nowPage, totalRecord, cPage, numPerPage}) {
    
    const router = useRouter();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">번호</TableCell>
                    <TableCell align="center">제목</TableCell>
                    <TableCell align="center">글쓴이</TableCell>
                    <TableCell align="center">등록일</TableCell>
                    <TableCell align="center">조회수</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {b_ar.map((bvo,idx) => (
                    <TableRow key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" component="th" scope="row">
                        {totalRecord - (((cPage-1) * numPerPage) + idx)}
                    </TableCell>
                    <TableCell align="left">
                        <Link href={`/bbs/detail/${bvo.b_idx}?nowPage=${nowPage}`}>{bvo.subject} { bvo.c_list.length > 0 ? `(${bvo.c_list.length})` : null}</Link>
                    </TableCell>
                    <TableCell align="center">{bvo.writer}</TableCell>
                    <TableCell align="center">{bvo.write_date}</TableCell>
                    <TableCell align="center">{bvo.hit}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell align='left' colSpan={4}>
                        <Pagination color='primary' page={nowPage} count={totalPage} onClick={changePage}/>
                    </TableCell>
                    <TableCell>
                        <Button onClick={()=>router.push('/bbs/write')}
                        align='right' variant='contained'>글쓰기</Button>
                    </TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
