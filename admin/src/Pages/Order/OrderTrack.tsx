import {  Box, Card, CardContent, Grid,  Icon,  Paper,  Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IOrder } from '../../Interface/IOrder';
import { steps } from './Step';
import OrderStatusDropdown from './OrderStatusDropdown';
import { getStatusIndex } from '../../Ultis/getStatusIndex';

type CancelCardProps = {
    step: typeof steps[number];
    isActive: boolean;
}
const CancelCard: React.FC<CancelCardProps> = ({step, isActive}: CancelCardProps) => {
    return (
        <Card variant="outlined" key={step.label} sx={{marginTop: 2, borderColor: isActive ? step.color : '#E2E8F0'}}>
            <Box display={'flex'} p={2}>
                <Icon color={isActive ? 'error' : 'disabled'} sx={{marginTop: 2}}>{step.icon}</Icon>
                <CardContent sx={{color: isActive ? step.color : '#00000099'}}>
                    <Typography>{step.label}</Typography>
                    <Typography>
                        {step.description}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}
type OrderTraskProps = {
    orderData: IOrder | null;
    onOrderUpdate: (orderId: string, newStatus: string) => void;
}

const OrderTrack : React.FC<OrderTraskProps> = ({orderData, onOrderUpdate}) => {
    const [orderState, setOrderState] = useState<IOrder | null>(orderData);
    const [activeStep, setActiveStep] = useState<number>(getStatusIndex(orderData?.status || ''));

  useEffect(()=>{
    if(orderData  && orderData != orderState){
        setOrderState(orderData);
        setActiveStep(getStatusIndex(orderData?.status || ''));
    }
  },[orderData]);
  
  const handleStatusChange = (orderId: string, newStatus: string, newIndex: number) => {
    setOrderState((prev) => {
        if (!prev) return prev; // Ensure prev is not undefined

        const updatedOrderData = { ...prev };
        if (updatedOrderData._id === orderId) {
            updatedOrderData.status = newStatus;
        }
        return updatedOrderData; 
    });
    setActiveStep(newIndex)
    onOrderUpdate(orderId, newStatus);
  };

  return (
    orderState && (
        <>
            <Grid width={"100%"} item display={'flex'} justifyContent={'space-between'}>
                <Typography variant='h6'>
                Track Order
                </Typography>
                <OrderStatusDropdown
                    status={orderState?.status}
                    orderId={orderState?._id}
                    onStatusChange={(newStatus, index)=>handleStatusChange(orderState?._id, newStatus, index)}
                />
            </Grid>
            <Grid width={"100%"} item>
                <Stepper activeStep={activeStep} orientation='vertical'>
                    {
                        steps.map((step, index)=>(
                            index != steps.length - 1 && (
                                <Step key={index}>
                                    <Box
                                        sx={{
                                            color: activeStep === steps.length - 1 || activeStep > index ? 'black': activeStep === index ? step.color : '#E2E8F0',
                                            '& .MuiStepLabel-root': {
                                                color: activeStep === steps.length - 1 || activeStep > index ? 'black' : activeStep === index ? step.color : '#E2E8F0'
                                            }
                                        }}
                                    >
                                        <StepLabel
                                            StepIconComponent={()=>step.icon}
                                        >
                                            {step.label}
                                        </StepLabel>
                                        <StepContent>
                                            {step.description}
                                        </StepContent>
                                    </Box>
                                </Step>
                            )
                        ))
                    }
                </Stepper>
                
                <CancelCard step={steps[steps.length - 1]} isActive={activeStep === steps.length - 1} />
            </Grid>
        </>
    )
  )
}

export default OrderTrack