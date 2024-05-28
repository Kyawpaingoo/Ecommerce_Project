import { Box, Card, CardContent, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Grid, Typography } from "@mui/material";
import host from '../../Data/Data..js';
import { useState, useEffect } from "react";

const Checkout = ({orderInfo}) => {
  console.log(orderInfo);

  const {shippingAddress, orderDetailData} = orderInfo;
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotalPrice, setSubTotalPrice] = useState(0);
  const shippingFees = 10;
  const tax = 5;
  
  useEffect(()=>{
    const subTotal = orderDetailData.length >= 2 ? orderDetailData.reduce((sum, item)=> sum + item.price * item.qty, 0) : orderDetailData[0].price;
    const total = subTotal + shippingFees;
    setSubTotalPrice(subTotal)
    setTotalPrice(total);
  })

  const {name, phone, ...address} = shippingAddress;

  return (
    <Box>
      <Typography variant="h5" marginBottom={2}>Order Summary</Typography>
      <Divider />
      <List>
        {
          orderDetailData.map((order)=>(
            <ListItem key={order._id}>
                <ListItemAvatar>
                  <img src={`${host.host}/images/${order.image}`} width={75} height={75} />
                </ListItemAvatar>
                <ListItemSecondaryAction>
                  <ListItemText primary={order.name} secondary={'$'+ order.price} />
                </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
      <Card variant="outlined" sx={{margin: 2, paddingY: '5px', paddingX:2}}>
        <CardContent>
        <Typography variant="h6">Shipping Address</Typography>
        <Typography>Name: {name}</Typography>
        <Typography>Phone: {phone}</Typography>
        <Typography>Address: {`${address.address},${address.city}, ${address.state},${address.country}`}</Typography> 
        </CardContent>
      </Card>

      <Box paddingLeft={2}>
        <Typography variant="body1" marginBottom={2}>Check Out</Typography>
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
        </Grid>
      </Box>
    </Box>
  )
}

export default Checkout