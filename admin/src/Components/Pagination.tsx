import {  Pagination, Stack } from '@mui/material';
import React from 'react'

interface PaginationProps{
    currentPage: number;
    totalPage:number;
    onPageChange: (page: number)=>void;
}

const PaginatedComp: React.FC<PaginationProps> = ({currentPage, totalPage, onPageChange}) => {
    const handlPageChange = (event: React.ChangeEvent<unknown>, page: number)=>{
        onPageChange(page)
    }
  return (
    <Stack spacing={2} marginTop={3}   sx={{
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
      }}>
        <Pagination page={currentPage} 
                    count={totalPage} 
                    shape='rounded' 
                    onChange={handlPageChange} 
                    color='primary'
        />
    </Stack>
  )
}

export default PaginatedComp