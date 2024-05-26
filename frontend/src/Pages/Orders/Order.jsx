import { Box, Button, Step, StepLabel, Stepper, Paper } from '@mui/material'
import MainLayout from '../Layout/MainLayout.jsx'
import OrderList from './OrderList.jsx'
import ShippingAddress from './ShippingAddress.jsx'
import Checkout from './Checkout.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const steps = ['Order', 'Shipping Info', 'Checkout'];

const Order = () => {
  const [orderInfo, setOrderInfo] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const param = useParams();

  useEffect(()=>{
    const fetchData = async()=>{
      await axios.get(`/product/${param.id}`).then((data)=>{
        //console.log(data);
        setOrderInfo({
          'orderDetailData':[
            data.data
          ]
        });
      })
    }

    fetchData();
  },[param.id])


  const handleQty = (index, qty)=>{
    setOrderInfo(prevState =>{
      const updateOrderDetailData = [...prevState.orderDetailData];
      updateOrderDetailData[index].qty = qty;
      return {...prevState, updateOrderDetailData}
    })
  };

  const handleShippingAddress = (address) =>{
    setOrderInfo(prevState => ({
        ...prevState, 
        shippingAddress : {...prevState.shippingAddress, ...address}
    }))
  }


  const handleNext = () =>{
    if(activeStep < steps.length - 1){
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
    else{
      handleSubmit();
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmit = async ()=>{
    console.log('handleSubmit');
  }

  return (
    <MainLayout>
        <Box sx={{maxWidth: '100rem', marginY: 5, marginX: 20}}>
          <Stepper activeStep={activeStep}>
            {
              steps.map((label)=>(
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))
            }
          </Stepper>

          <Box component={Paper} maxWidth={'50rem'} marginX={25} marginTop={4} paddingY={2} paddingX={4}>
            {activeStep === 0 && <OrderList products={orderInfo.orderDetailData} handleQty={handleQty} />}
            {activeStep === 1 && <ShippingAddress updateShippingAddress={handleShippingAddress} />}
            {activeStep === 2 && <Checkout />}

            <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button disabled={activeStep === 0} onClick={handleBack} sx={{ marginRight: 1 }}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit Order' : 'Next'}
              </Button>
            </Box>
          </Box>

          
        </Box>
    </MainLayout>
  )
}

export default Order