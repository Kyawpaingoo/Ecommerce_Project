import { Grid, Paper, Typography, Link } from '@mui/material'
import DashBoardLayout from './Layout/DashboardLayout.jsx'
import Chart from '../Components/Chart.jsx'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContext.jsx'

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [product, setProuct] = useState([]);
  const [order, setOrder] = useState([]);
  const {authUser} = useContext(AuthContext);
  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await axios.get('/analytic/all/');
      const userData = response.data.user.length;
      const productData = response.data.product.length;
      const orderData = response.data.order.length;

      setUser(userData);
      setProuct(productData);
      setOrder(orderData);
    }

    fetchData();
  },[user, product, order])

  return ( 
      authUser ? (
        <DashBoardLayout> 
            <Grid container spacing={4}>
              <Grid item md={4}>
                  <Paper sx={{
                    p:2,
                    display: 'flex',
                    flexDirection: 'column',
                    
                  }}>
                    <Typography variant='h6' color={'primary'}>Orders</Typography>
                    <Typography variant='h4' color={'green'}>{order}</Typography>
                  </Paper>
              </Grid>
              <Grid item md={4}>
              <Paper sx={{
                    p:2,
                    display: 'flex',
                    flexDirection: 'column',
                    
                  }}>
                    <Typography variant='h6' color={'primary'}>Products</Typography>
                    <Typography variant='h4' color={'green'}>{product}</Typography>
                  </Paper>
              </Grid>
              <Grid item md={4}>
              <Paper sx={{
                    p:2,
                    display: 'flex',
                    flexDirection: 'column',
                    
                  }}>
                    <Typography variant='h6' color={'primary'}>Users</Typography>
                    <Typography variant='h4' color={'green'}>{user}</Typography>
                  </Paper>
              </Grid>
  
              <Grid item  xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p:2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240
                  }}
                >
                    <Chart />
                </Paper>
              </Grid>
  
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p:2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240
                  }}
                >
                  <Typography>Recent Desposits</Typography>
                  <Typography component='p' variant='h4'>
                      $3,024,00
                    </Typography>
                    <Typography color='text.secondary' sx={{flex: 1}}>
                      on 15 March, 2024
                    </Typography>
                    <div>
                      <Link color='primary'>
                        View Balance
                      </Link>
                    </div>
                </Paper>
              </Grid>
            </Grid>
        </DashBoardLayout>
      ) : 
      (
        <Navigate to={'/login'} />
      ) 
   
  )
}

export default Dashboard