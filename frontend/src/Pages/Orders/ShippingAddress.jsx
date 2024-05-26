import { Box, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react';

const ShippingAddress = ({updateShippingAddress}) => {

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })


  const handleShippingAddress = (e) =>{
    const {id, value} = e.target;
      setShippingAddress(prevInfo => {
        const newInfo = {...prevInfo, [id] : value};
        updateShippingAddress(newInfo)
        return newInfo;
      })
  }

  return (
    <Box container spacing={2}>
      <Typography variant='h5' marginTop={2}>Shipping Address</Typography>
      <Grid container marginTop={2} spacing={2}>
        <Grid item md={6} >
          <TextField
            onChange={handleShippingAddress} 
            margin='normal'
            required
            id='name'
            label='Name'
            autoComplete='name'
            autoFocus
            fullWidth 
            value={shippingAddress.name}
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
             onChange={handleShippingAddress} 
             margin='normal'
             required
             id='phone'
             label='Phone'
             autoComplete='phone'
             autoFocus
             fullWidth 
             value={shippingAddress.phone}
          />
        </Grid>
        <Grid item md={12} >
          <TextField 
             onChange={handleShippingAddress} 
             margin='normal'
             required
             id='address'
             label='Address'
             autoComplete='address'
             autoFocus
             fullWidth
             value={shippingAddress.address}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
             onChange={handleShippingAddress} 
             margin='normal'
             required
             id='city'
             label='City'
             autoComplete='city'
             autoFocus
             fullWidth
             value={shippingAddress.city}
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
             onChange={handleShippingAddress} 
             margin='normal'
             required
             id='state'
             label='state'
             autoComplete='state'
             autoFocus
             fullWidth
             value={shippingAddress.state}
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
             onChange={handleShippingAddress} 
             margin='normal'
             required
             id='zipcode'
             label='Zip/Postal Code'
             autoComplete='zipcode'
             autoFocus
             fullWidth
             value={shippingAddress.zipCode}
          />
        </Grid>
        <Grid item md={6}>
          <TextField 
            onChange={handleShippingAddress} 
            margin='normal'
            required
            id='country'
            label='Country'
            autoComplete='country'
            autoFocus
            fullWidth
            value={shippingAddress.country}
          />
        </Grid>
      </Grid>
      
    </Box>
  )
}

export default ShippingAddress