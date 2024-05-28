import { useContext, useEffect, useState } from 'react'
import AuthContext from '../Context/AuthContext';
import MainLayout from './Layout/MainLayout.jsx'
import { Box, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material';
import axios from 'axios';
import InventoryIcon from '@mui/icons-material/Inventory';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const MyOrderList = () => {
    const [ordreList, setOrderList] = useState([]);
    const {authUser} = useContext(AuthContext);
    
    useEffect(()=>{
      const fetchData = async()=>{
        await axios.get('/order/getbyUser/'+`${authUser._id}`).then((d)=>{
          setOrderList(d.data);
        })
      }
      fetchData();
    },[ordreList])

  return (
    <MainLayout>
      <Box component={Paper} maxWidth={'50rem'} marginX={45} marginTop={4} paddingY={2} paddingX={4}>
        <Typography variant='h5' marginBottom={2}>My Order List</Typography>
        <Divider />
          <List>
            {
              ordreList && ordreList.length > 0 ? (
                ordreList.map((order)=>(
                    <ListItem key={order._id} sx={{borderBottomWidth: 1, display: 'flex', alignItems: 'center' }}>
                        <ListItemAvatar  sx={{ minWidth: 'auto', marginRight: 2 }}>
                          <InventoryIcon />
                        </ListItemAvatar>
                        <ListItemText primary={order.code}
                            secondary={order.subTotalPrice} />
                        <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <ListItemText sx={{ textAlign: 'center', flex: 1 }}>
                        <Chip label={order.status}  color={order.status == 'On Delivery' ? 'primary' : order.status == 'Arrive' ? 'success' : 'default'} />
                        </ListItemText>
                          <IconButton component={Link} to={`/orderDetail/${order._id}`}>
                            <ArrowForwardIosIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    
                ))
              ) : (
                <Typography>No Order Here.</Typography>
              )
            }
          </List>
      </Box>
    </MainLayout>
  )
}

export default MyOrderList