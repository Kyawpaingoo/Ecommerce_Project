import React from 'react';
import {  Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, createTheme, Grid, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../Layout/DashboardLayout.tsx';
import host from '../../Data/Data.ts';
import useOrderDetail from '../../Hooks/useOrderDetail.tsx';

const theme = createTheme();
const OrderDetail : React.FC = () => {
  const {id}  = useParams<{id: string}>();
  const {orderDetail, subtotalPrice, totalPrice, shippingFees, tax} = useOrderDetail(id);

  return (
    <DashboardLayout>
      <IconButton>
        
      </IconButton>
      <Typography variant='h4'>
        Order Details
      </Typography>
      <TableContainer sx={{marginTop: 2}}>
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor: theme.palette.common.black}}>
              <TableCell sx={{color: 'white'}}>Order Item</TableCell>
              <TableCell sx={{color: 'white'}}>Quantity</TableCell>
              <TableCell sx={{color: 'white'}}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              orderDetail && orderDetail.length > 0 ? (
                orderDetail.map((d)=>(
                  <TableRow key={d._id}>
                  <TableCell sx={{display: 'flex'}}>
                    <img src={`${host.host}/images/${d.product.image}`} style={{width: 75, height: 75, objectFit:'cover'}} />
                    <Box sx={{marginLeft: 2}}>
                      <Typography variant='h6'>{d.product.name}</Typography>
                      <Typography variant='caption'>{d.product.name}</Typography>
                    </Box>
                    
                  </TableCell>
                  <TableCell>
                    {d.qty}
                  </TableCell>
                  <TableCell>
                    {d.price}
                  </TableCell>
                </TableRow>
                ))
              ) : (
                <Typography>No Order.</Typography>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      
      <Grid container marginTop={4} spacing={2}>
        <Grid item md={7} display={'flex'} justifyContent={'flex-end'}>
          <Typography marginRight={4}
            variant='h6'
          >Order Summary</Typography>
        </Grid>
        <Grid container item md={5}>
          <Grid width={"100%"} item display={'flex'} justifyContent={'space-between'}>
            <Typography variant='caption'>Subtotal: </Typography>
            <Typography>${subtotalPrice.toFixed(2)}</Typography>
          </Grid>
          <Grid width={"100%"} item display={'flex'} justifyContent={'space-between'} marginTop={2}>
            <Typography variant='caption'>Shipping: </Typography>
            <Typography>${shippingFees}</Typography>
          </Grid>
          <Grid width={"100%"} item display={'flex'} justifyContent={'space-between'} marginTop={2}>
            <Typography variant='caption'>Tax: </Typography>
            <Typography>${tax}</Typography>
          </Grid>
          <Grid width={"100%"} item display={'flex'} justifyContent={'space-between'} marginTop={2} 
          height={50} borderBottom={1}>
            <Typography variant='caption'>Total: </Typography>
            <Typography>${totalPrice.toFixed(2)}</Typography>
          </Grid>
          {/* <Divider /> */}
        </Grid>
      </Grid>
    </DashboardLayout>
    
  )
}

export default OrderDetail