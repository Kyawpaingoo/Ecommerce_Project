import React, { useEffect } from 'react';
import { useState } from 'react'
import DashboardLayout from '../Layout/DashboardLayout.tsx'
import { Box, Stack, Table, TableBody, TableCell, Button, TableHead, TableRow, Typography, IconButton, Paper,  } from '@mui/material'
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import host from '../../Data/Data.ts';
import {Link, useNavigate} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { IProduct } from '../../Interface/IProduct.ts';
import useApiList from '../../Hooks/useApiList.tsx';
import PaginatedComp from '../../Components/Pagination.tsx';

const ProductList = () => {
    const urlstring: string = '/product/all';
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {resultList: products, page, count, totalPage, prevPage, nextPage} = useApiList<IProduct>(urlstring, currentPage);
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(()=>{
        setCurrentPage(page);
    }, [page])
    
    const destroy = async (id?: string)=>{
        await axios.post(`/product/destroy/${id}`).then((d)=>{
            console.log(d);
            if(d.data === 'success'){
                setMessage('Product Delete Success!');
                
            }
            else{
                setMessage('Product Delete Failed!');
            }
        })
    }

    const edit = async(id?: string)=>{
        navigate(`/product/edit/${id}`);
    }

    const closeMessage = ()=>{
        setMessage('');
    }

    const handlPageChange = (page: number)=>{
        setCurrentPage(page);
    }
  return (
    <DashboardLayout>
        <Box>
            <Button variant='contained' component={Link} 
                to={'/product/create'} startIcon={<AddIcon />} color='success'>
                Create
            </Button>
        </Box>
        <Box sx={{height:'600px'}}>
            {
                message && (
                    <Box sx={{width: '100%', marginY: 2, backgroundColor: message == 'Product Delete Success!'? '#00e676' : 'red'}} display={'flex'}>
                        <Typography paddingY={1} paddingLeft={2} color={'white'}>{message}</Typography>
                        <IconButton onClick={closeMessage} sx={{marginLeft:'auto'}}>
                            <CloseIcon sx={{color: 'white'}}  />
                        </IconButton>
                    </Box>
                )
            }      
            <Table borderBottom={1} component={Box}  sx={{ minWidth: 700 }}>
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
                    {
                        products && products.length > 0 ? (
                            products?.map((product : IProduct)=>(
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <img alt={product.name} src={`${host.host}/images/${product.image}`} style={{width: 75, height: 75, objectFit:'cover'}} />
                                    </TableCell>
                                    <TableCell sx={{width: '350px'}}>{product.name}</TableCell>
                                    <TableCell sx={{width: '150px'}}>{product.price}</TableCell>
                                    <TableCell sx={{width: '200px'}}>
                                        {product.color && product.color.length > 0 ? product.color.map(color => color.color).join(', ') : 'N/A'}
                                    </TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.gender}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    
                                    <TableCell>
                                        <Stack direction={'row'} spacing={2}>
                                            <Button onClick={()=>edit(product._id)} variant='contained' endIcon={<EditIcon />}>Edit</Button>
                                            <Button onClick={()=>destroy(product._id)} variant="contained" endIcon={<DeleteIcon />} color='error'>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) :(
                            <Typography>
                                No Product Here.
                            </Typography>
                        )
                    }
                </TableBody>
            </Table>
        </Box>
        <Box marginY={4}>
            <PaginatedComp currentPage={currentPage} totalPage={totalPage} onPageChange={handlPageChange} />        
        </Box>
    </DashboardLayout>
  )
}

export default ProductList