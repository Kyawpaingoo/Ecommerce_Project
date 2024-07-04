import React from "react";
import { Chip, ListItemText, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { steps } from "./Step";
import { IOrder } from "../../Interface/IOrder";
import { getStatusIndex } from "../../Ultis/getStatusIndex";

type OrderStatusDropdownProps = {
    status: string | undefined;
    orderId: string | undefined;
    onStatusChange: (status: string, index: number) => void;
}
  
const OrderStatusDropdown : React.FC<OrderStatusDropdownProps> = ({status, orderId, onStatusChange}) =>{
    const [anchorEI, setAncorEl] = useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) =>{
        setAncorEl(event.currentTarget);
    }
  
    const handleClose = ()=>{
        setAncorEl(null);
    }
  
    const handleMenuItemClick = (status: string, index: number) =>{
        onStatusChange(status, index);
        handleClose();
    }
  
    return(
        <>
            <ListItemText sx={{display:'flex', justifyContent:'flex-end'}}>
                <Chip label='Change Status' 
                color='primary' 
                onClick={handleClick}
                style={{cursor: 'pointer'}}
                />
            </ListItemText>
            <Menu
                anchorEl={anchorEI}
                open={Boolean(anchorEI)}
                onClose={handleClose}
                sx={{marginTop: 1}}
            >
                {
                    steps.map((step, index)=>(
                        <MenuItem key={index} onClick={()=> handleMenuItemClick(step.label, index)}>
                            {step.label}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
 }

export default OrderStatusDropdown

