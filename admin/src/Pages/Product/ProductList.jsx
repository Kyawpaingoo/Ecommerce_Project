import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Layout/DashboardLayout.jsx'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [count, setCount] = useState(0);
    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get('/product/all').then((d)=>{
                setProducts(d.data.docs);
                setTotalPage(d.data.totalPages);
                setCount(d.data.count);
            })
        }
        fetchData();
    }, [page]);
  return (
    <DashboardLayout>
        <Table size='sm'>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Image
                    </TableCell>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                        Price
                    </TableCell>
                    <TableCell>
                        Colors
                    </TableCell>
                    <TableCell>
                        Stock
                    </TableCell>
                    <TableCell>
                        Gender
                    </TableCell>
                    <TableCell>
                        Brand
                    </TableCell>
                    <TableCell>
                        Category
                    </TableCell>
                    <TableCell>
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

            </TableBody>
        </Table>
    </DashboardLayout>
  )
}

export default ProductList