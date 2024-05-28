import { Box, Button, Step, StepLabel, Stepper, Paper } from '@mui/material'
import MainLayout from '../Layout/MainLayout.jsx'
import OrderList from './OrderList.jsx'
import ShippingAddress from './ShippingAddress.jsx'
import Checkout from './Checkout.jsx'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../Context/AuthContext.jsx'

const steps = ['Order', 'Shipping Info', 'Checkout'];

const Order = () => {
  const [orderInfo, setOrderInfo] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const {authUser} = useContext(AuthContext);
  const param = useParams();
  const navigate = useNavigate();

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
      return {...prevState,orderDetailData: updateOrderDetailData}
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
      const formData = {
        orderData: {
          code: '',
          user: authUser.id,
          subTotalPrice: '',
          shipping_address: `${orderInfo.shippingAddress.address},${orderInfo.shippingAddress.city}, ${orderInfo.shippingAddress.state},${orderInfo.shippingAddress.country}`,
          status: '',
        },
        orderDetailData: orderInfo.orderDetailData.map((product)=>({
            product: product._id,
            qty: product.qty,
        }))
      }

      await axios.post('/order/store', formData).then((d)=>{
        if(d.data== 'success'){
          console.log('success');
          navigate('/complete')
        }
        else{
          console.log('error')
        }
      })
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
            {activeStep === 2 && <Checkout orderInfo={orderInfo} />}

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