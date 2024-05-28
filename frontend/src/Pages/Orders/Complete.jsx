import MainLayout from '../Layout/MainLayout.jsx'
import { Button, Grid, Paper, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const Complete = () => {
  return (
    <MainLayout>
       <Grid component={Paper} maxWidth={'50rem'} marginX={45} marginTop={4} paddingY={2} paddingX={4} >
          <Grid item>
              <Typography variant='h1'>📦</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{fontWeight: 'bold'}}>Thank you for your order!</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' color='text.secondary'>Your order number is <strong>#11111</strong>. We have emailed your order confimration and will update you once its shipped.</Typography>
          </Grid>
          <Grid item sx={{display:'flex', justifyContent:'center'}}>
            <Button variant='contained' color='success'>
              View My Order
            </Button>
          </Grid>
          <Grid item>
            <Button startIcon={<ArrowBackIosIcon />} variant='contained' color='primary' component={Link} to={'/'}>
              Back to Home
            </Button>
          </Grid>
       </Grid>
    </MainLayout>
  )
}

export default Complete