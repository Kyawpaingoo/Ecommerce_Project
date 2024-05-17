import { Grid, Paper, Typography, Link } from '@mui/material'
import DashBoardLayout from './Layout/DashboardLayout.jsx'
import Chart from '../Components/Chart.jsx'

const Dashboard = () => {
  return (
    <DashBoardLayout>
        <Grid container spacing={3}>
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
  )
}

export default Dashboard