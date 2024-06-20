import React from 'react';
import { Chip, IconButton, List, ListItem, ListItemAvatar, Menu, MenuItem, ListItemText, Typography, Avatar, ListItemSecondaryAction, Box } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DashboardLayout from '../Layout/DashboardLayout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import { IOrder } from '../../Interface/IOrder';
import useApiList from '../../Hooks/useApiList';
import PaginatedComp from '../../Components/Pagination';

interface StatusDropdownProps{
    status: string;
    orderId: string;
    onStatusChange: (status: string) => void;
}

const StatusDropdown : React.FC<StatusDropdownProps> = ({status, orderId, onStatusChange}) =>{
    const [anchorEI, setAncorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) =>{
        setAncorEl(event.currentTarget);
    }

    const handleClose = ()=>{
        setAncorEl(null);
    }

    const handleMenuItemClick = async (status: string) =>{
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
 
const OrderList : React.FC = () => {
    const urlstring: string = '/order/all'
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {resultList, page, totalPage} = useApiList<IOrder>(urlstring, currentPage);
    const [orederListState, setOrderListState] = useState<IOrder[]>(resultList ?? []);

    useEffect(()=>{
        setOrderListState(resultList ?? []);
        setCurrentPage(page)
    },[resultList, page])

    const handleStatusChange = (orderId : string, newStatus : string) =>{
        
        setOrderListState((prevList)=>{
            return prevList.map((order)=>{
            return order._id == orderId ? {...order, status: newStatus} : order
            });
        })
    }

    const handlePageChange = (page: number)=>{
        setCurrentPage(page);
    }

  return (
    <DashboardLayout>
        <Box sx={{height: '600px'}}>
            <List sx={{width: '100%'}}>
                {
                orederListState && orederListState.length > 0 ? (
                        orederListState.map((order)=>(
                            <ListItem key={order._id} sx={{borderBottom: 1}}>
                                <ListItemSecondaryAction>
                                    <Link to={`/orderDetail/${order._id}`}>
                                        <IconButton edge='end'>
                                            <Avatar sx={{bgcolor: 'black'}}>
                                                <ArrowForwardIosIcon />
                                            </Avatar>
                                        </IconButton>
                                    </Link>
                                </ListItemSecondaryAction>
                                <ListItemAvatar>
                                    <Inventory2Icon />
                                </ListItemAvatar>
                                <ListItemText 
                                    primary={order.user}
                                    secondary={order.createdAt.toString()}
                                />
                                <ListItemText>
                                    <Typography variant='h6'>
                                    {order.code}
                                    </Typography>
                                    
                                </ListItemText>
                                <ListItemText>
                                    <Typography variant='subtitle1'>
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
        </Box>
        <Box marginTop={4}>
            <PaginatedComp currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
        </Box>
    </DashboardLayout>
        
  )
}

export default OrderList