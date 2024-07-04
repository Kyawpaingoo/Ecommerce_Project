import React from 'react';
import { Chip, IconButton, List, ListItem, ListItemAvatar, Menu, MenuItem, ListItemText, Typography, Avatar, ListItemSecondaryAction, Box, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DashboardLayout from '../Layout/DashboardLayout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import { IOrder } from '../../Interface/IOrder';
import useApiList from '../../Hooks/useApiList';
import PaginatedComp from '../../Components/Pagination';
import { getStatusColor } from '../../Ultis/getStatusIndex';

type StatusDropdownProps = {
    status: string;
}

const OrderStatusChip = styled(Chip)(({theme})=>({
    color: theme.palette.common.white,
}))

const StatusDropdown : React.FC<StatusDropdownProps> = ({status}) =>{
    return(
        <>
            <ListItemText>
                <OrderStatusChip label={status} 
                   style={{
                    backgroundColor: getStatusColor(status),
                   }}
                />
            </ListItemText>
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

    const handlePageChange = (page: number)=>{
        setCurrentPage(page);
    }

  return (
    <DashboardLayout>
        <Box sx={{height: '600px'}}>
            <Table borderBottom={1} component={Box}  sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            No
                        </TableCell>
                        <TableCell>
                            Order Code
                        </TableCell>
                        <TableCell>
                            User ID
                        </TableCell>
                        <TableCell>
                            Shipping Address
                        </TableCell>
                        <TableCell>
                            Order Status
                        </TableCell>
                        <TableCell>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orederListState && orederListState.length > 0 ? (
                            orederListState.map((order)=>(
                                <TableRow key={order._id}>
                                    <TableCell>
                                        {(page * 0) + (orederListState.indexOf(order) + 1)}
                                    </TableCell>
                                    <TableCell>
                                        {order.code}
                                    </TableCell>
                                    <TableCell>
                                        {order.user}
                                    </TableCell>
                                    <TableCell>
                                        {order.shipping_address}
                                    </TableCell>
                                    <TableCell>
                                        <StatusDropdown 
                                        status={order.status}  />   
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/orderDetail/${order._id}`}>
                                            <IconButton edge='end'>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <Typography>No Data Found.</Typography>
                        )
                    }
                </TableBody>
            </Table>
        </Box>
        <Box marginTop={2}>
            <PaginatedComp currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
        </Box>
    </DashboardLayout>
        
  )
}

export default OrderList