import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout.jsx'

const Copyright = (props)=>{
  return (
    <Typography variant="body2" color='text.secondary' aligh='center' {...props}>
       {'Copyright © '}
       <Link color='inherit'>
        Your Website
       </Link>
       {' '}
       {new Date().getFullYear()};
       {'.'}
    </Typography>
  )
}

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const register = async()=>{
    setLoader(true);
    await axios.post('/register', {name, email, password}).then((d)=>{
      console.log(d);
      const {data, message} = d.data;

      switch(message){
        case 'success':
          navigate('/login');
          break;
        case 'validate_error':
          data.map((message)=>{
            setErrorMessage(message.message);
          });
          return;
        default:
          setErrorMessage(message);
          break;
      }
    }).catch((error) => {
      console.error('Error logging in:', error);
    });
  }
  return (
    <MainLayout>
      <Grid container component="main" sx={{height: '40vh', width:'50vh', marginX: 75, marginTop: 5, marginBottom: 40}}>
        
        <Box component={Paper}
          sx={{
            py: 4,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant="h5">
            Sign up
          </Typography>

          <Box component='form' noValidate sx={{mt: 2}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>  
              <TextField
                onChange={e=> setName(e.target.value)}
                autoComplete="given-name"
                name="Name"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus />
              </Grid>
              <Grid item xs={12}>  
              <TextField
              onChange={e=> setEmail(e.target.value)}
                autoComplete="email"
                name="Email"
                required
                fullWidth
                id="Email"
                label="Email"
                autoFocus />
              </Grid>
              <Grid item xs={12}>  
              <TextField
                onChange={e=> setPassword(e.target.value)}
                autoComplete="password"
                name="Password"
                required
                fullWidth
                id="Password"
                label="Password"
                autoFocus />
              </Grid>
              <Grid item xs={12}>
              <FormControlLabel
                      control={<Checkbox value='remember' color='primary' />} label='Remember Me'
                    />
              </Grid>
            </Grid>
            <Button 
            type='submit'
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            onClick={(event)=>{
              event.preventDefault();
              register();
            }}
            >
              Sign Up
            </Button>
            <Grid>
            {
              errorMessage && (
                <Typography sx={{color: 'red'}}>
                        {errorMessage}
                </Typography>
              )
            }
            </Grid>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{mt: 5}} />
        </Box>
      </Grid>
    </MainLayout>
  )
}

export default Register