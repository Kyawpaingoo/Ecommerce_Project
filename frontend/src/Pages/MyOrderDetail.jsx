import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MainLayout from './Layout/MainLayout.jsx'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import host from '../Data/Data..js';

const MyOrderDetail = () => {
    const [orderDetailList, setOrderDetailList] = useState([]);
    const params = useParams();
    const [totalPrice, setTotalPrice] = useState(0);
    const [subtotalPrice, setSubTotalPrice] = useState(0);
    const shippingFees = 10;
    const tax = 5;

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get(`/orderDetail/getbyOrderId/${params.id}`);
            const data = response.data;
            setOrderDetailList(data);
            
            const subTotal = data.length >= 2 ? data.reduce((sum, item)=> sum + item.price  * item.qty, 0) : data[0].price;
            const total = subTotal + tax + shippingFees;
            setSubTotalPrice(subTotal);
            setTotalPrice(total);
        }
        fetchData();
    },[params.id]);
  return (
    <MainLayout>
        <Box component={Paper} maxWidth={'50rem'} marginX={45} marginTop={4} paddingY={2} paddingX={4}>
            <Typography>Order ID {'#' + params.id}</Typography>
            <List>
                {
                    orderDetailList && orderDetailList.length > 0 ? (
                        orderDetailList.map((order)=>(
                            <>
                                <ListItem key={order._id}>
                                    <ListItemAvatar>
                                        <img src={`${host.host}/images/${order.product.image}`} width={75} height={75} />
                                    </ListItemAvatar>
                                    <ListItemSecondaryAction>
                                        <ListItemText 
                                            primary={order.product.name}
                                            secondary={'$'+ order.product.price}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Box paddingLeft={2}>
                                    <Typography variant='body1' marginBottom={2}>Check Out</Typography>
                                    <Grid container>
                                        <Grid item width={'100%'} display={'flex'} justifyContent={'space-between'}>
                                            <Typography>SubTotal: </Typography>
                                            <Typography>${subtotalPrice} </Typography>
                                        </Grid>
                                        <Grid width={"100%"} item display={'flex'} justifyContent={'space-between'} marginTop={1}>
                                            <Typography>Shipping: </Typography>
                                            <Typography>${shippingFees}</Typography>
                                        </Grid>
                                        <Grid width={"100%"} item display={'flex'} justifyContent={'space-between'} marginTop={1} borderBottom={1}>
                                            <Typography>Tax: </Typography>
                                            <Typography>${tax}</Typography>
                                        </Grid>
                                            <Divider />
                                            <Grid item width={'100%'} display={'flex'} justifyContent={'space-between'} marginTop={1}>
                                            <Typography>Total: </Typography>
                                            <Typography>${totalPrice} </Typography>
                                        </Grid>
                                        <Grid item marginTop={2}>
                                            <Button startIcon={<ArrowBackIosIcon />} variant='contained' color='primary' component={Link} to={'/myorder'}>
                                            Back
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                            
                        ))
                    ) : (
                        <Typography>No Order Lit Here.</Typography>
                    )
                }
                
            </List>
        </Box>
    </MainLayout>
  )
}

export default MyOrderDetail