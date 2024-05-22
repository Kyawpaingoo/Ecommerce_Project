import { Chip, IconButton, List, ListItem, ListItemAvatar, Menu, MenuItem, ListItemText, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DashboardLayout from '../Layout/DashboardLayout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';


const StatusDropdown = ({status, orderId, onStatusChange}) =>{
    const [anchorEI, setAncorEl] = useState(null);

    const handleClick = (event) =>{
        setAncorEl(event.currentTarget);
    }

    const handleClose = ()=>{
        setAncorEl(null);
    }

    const handleMenuItemClick = async (status) =>{
        const response = await axios.post('/order/updateStatus/'+orderId, {status: status});

        const updatedData = response.data; 
        onStatusChange(updatedData.status);
        handleClose();
    }

    return(
        <>
            <ListItemText>
                <Chip label={status} 
                color={status == 'On Delivery' ? 'primary' : status == 'Arrive' ? 'success' : 'default'} 
                onClick={handleClick}
                style={{cursor: 'pointer'}}
                />
            </ListItemText>
            <Menu
                anchorEl={anchorEI}
                open={Boolean(anchorEI)}
                onClose={handleClose}
            >
                <MenuItem onClick={()=> handleMenuItemClick('Packing')}>Packing</MenuItem>
                <MenuItem onClick={()=> handleMenuItemClick('On Delivery')}>On Delivery</MenuItem>
                <MenuItem onClick={()=> handleMenuItemClick('Arrive')}>Arrive</MenuItem>
            </Menu>
        </>
    )
}
 
const OrderList = () => {
    const [orederList, setOrderList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState('');

    useEffect(()=>{
        const getData = async ()=>{
            await axios.get('/order/all').then((d)=>{
                setOrderList(d.data.docs);
                setTotalPage(d.data.totalPages)
            })
        }

        getData();
    },[orederList])

    const handleStatusChange = (orderId, newStatus) =>{
        
        setOrderList((prevList)=>{
            prevList.map((order)=>{
                order._id == orderId ? {...order, status: newStatus} : order
            });
        })
    }

  return (
    <DashboardLayout>
        <List sx={{width: '100%'}}>
            {
               orederList && orederList.length > 0 ? (
                    orederList.map((order)=>(
                        <ListItem key={order._id} sx={{borderBottom: 1}}
                            secondaryAction={
                                <IconButton edge='end' LinkComponent={Link} to={`/orderDetail/${order._id}`}>
                                    <Avatar sx={{bgcolor: 'black'}}>
                                        <ArrowForwardIosIcon />
                                    </Avatar>
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Inventory2Icon />
                            </ListItemAvatar>
                            <ListItemText 
                                primary={order.user}
                                secondary={order.createdAt}
                            />
                            <ListItemText>
                                <Typography variant='h6'>
                                {order.code}
                                </Typography>
                                
                            </ListItemText>
                            <ListItemText>
                                <Typography variant='subtitile1'>
                                {order.shipping_address}
                                </Typography>
                                
                            </ListItemText>
                            <StatusDropdown 
                            status={order.status} 
                            orderId={order._id}
                            onStatusChange={(newStatus)=>handleStatusChange(order._id, newStatus)} />
                        </ListItem>
                    ))
                ) : (
                    <Typography>No Data Found.</Typography>
                )
            }
        </List>
    </DashboardLayout>
        
  )
}

export default OrderList