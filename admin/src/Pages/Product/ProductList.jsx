import { useEffect, useState } from 'react'
import DashboardLayout from '../Layout/DashboardLayout.jsx'
import { Box, Stack, Table, TableBody, TableCell, Button, TableHead, TableRow, Typography  } from '@mui/material'
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import host from '../../Data/Data..js';
import {Link} from 'react-router-dom';

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
        <Box>
            <Button variant='contained' component={Link} 
                to={'/product/create'} startIcon={<AddIcon />} color='success'>
                Create
            </Button>
        </Box>
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
                {
                    products.length > 0 ? (
                        products.map((d)=>(
                            <TableRow key={d._id}>
                                <TableCell>
                                    <img src={`${host.host}/images/${d.image}`} style={{width: 75, height: 75, objectFit:'cover'}} />
                                </TableCell>
                                <TableCell>{d.name}</TableCell>
                                <TableCell>{d.price}</TableCell>
                                <TableCell>
                                    {d.color && d.color.length > 0 ? d.color.map(color => color.color).join(', ') : 'N/A'}
                                </TableCell>
                                <TableCell>{d.stock}</TableCell>
                                <TableCell>{d.gender}</TableCell>
                                <TableCell>{d.brand}</TableCell>
                                <TableCell>{d.category}</TableCell>
                                <TableCell>
                                    <Stack direction={'row'} spacing={2}>
                                        <Button variant='contained' endIcon={<EditIcon />}>Edit</Button>
                                        <Button variant="contained" endIcon={<DeleteIcon />} color='error'>
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
    </DashboardLayout>
  )
}

export default ProductList