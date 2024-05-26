import { useEffect, useState } from 'react'
import MainLayout from './Layout/MainLayout.jsx'
import { Link, useParams } from 'react-router-dom';
import host from '../Data/Data..js';
import axios from 'axios';
import PageLoader from '../Components/PageLoader';
import {Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Typography} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductDetail = () => {
    const [loader ,setLoader] = useState(true);
    const [product, setProduct] = useState({});
    const params = useParams();

    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get('/product/'+params.id).then((d)=>{
                setLoader(true);
                setProduct(d.data);
                setLoader(false);
            })
        }

        fetchData();
    },[params.id]);
  return (
    <MainLayout>
        {
            loader ? (<PageLoader />) : (
                product ? (
                    <Box sx={{marginX: 25, marginY: 5}}>
                        <Card sx={{display: {xs: 'block', md: 'flex'},}}>
                            <CardMedia component='img' sx={{width: 500, height: 500}} image={`${host.host}/images/${product.image}`}  />
                                <Box sx={{display: 'flex'}}>
                                    <CardContent sx={{paddingLeft:5, paddingTop: 2}}>
                                        <Typography component='div' variant='h3'>{product.name}</Typography>
                                        <Typography variant='h6' sx={{paddingTop: 1}}>Price: ${product.stock}</Typography>
                                        <Box sx={{display: 'flex', marginY: 2}}>
                                            <Button component={Link} to={`/order/${product._id}`} variant='outlined' size='large'  sx={{marginRight: 1}}>Buy Now</Button>
                                            <IconButton variant='outlined' color='error'>
                                                <FavoriteIcon />
                                            </IconButton>
                                        </Box>
                                        <Typography sx={{paddingTop: 1}}>Brand: {product.brand}</Typography>
                                        <Typography sx={{paddingTop: 1}}>Gender: {product.gender}</Typography>
                                        <Typography sx={{paddingTop: 1}}>Category: {product.category}</Typography>
                                        <Typography sx={{paddingTop: 1}}>Available Stock: {product.stock}</Typography>
                                    </CardContent>
                                </Box>
                        </Card>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex'}}>
                        <Typography>
                            No Post Found.
                        </Typography>
                    </Box>
                )
            )
        }
    </MainLayout>
  )
}

export default ProductDetail