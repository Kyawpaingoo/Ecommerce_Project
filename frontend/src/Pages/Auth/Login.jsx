import MainLayout from '../Layout/MainLayout.jsx'
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext.jsx';

const Copyright = (props)=>{
  return(
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='#'>
      Your Website</Link>{''}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const {setAuthUser} = useContext(AuthContext);

  const login = async ()=>{
    setLoader(true);
    await axios.post('/login', {email, password}).then(({data})=>{
      setLoader(false);
      if(data.message== 'email not found'){
        return setErrorMessage('Email not found.')
      }
      if(data.message == 'wrong password'){
        return setErrorMessage('Password not found.')
      }

      if(data.data.role != 'user'){
        return setErrorMessage('This account is not authorized to use.')
      }
      if(data.message == 'success' && data.data.role == 'user'){
        console.log('Login Success');
        setAuthUser(data.data);
        navigate('/')
      }
    }).catch((error) => {
      console.error('Error logging in:', error);
    });
  };
  return (
    <MainLayout>
        <Grid container component="main" sx={{height: '50vh', width:'100vh', marginX: 50, marginTop:5, marginBottom:30}}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
            />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <Avatar  sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component='h1' variant='h5'>
                    Sigin In
                  </Typography>
                  <Box component='form' noValidate sx={{mt: 1}}>
                    <TextField 
                      onChange={e=>setEmail(e.target.value)}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus 
                    />
                    <TextField 
                      onChange={e=>setPassword(e.target.value)}
                       margin="normal"
                       required
                       fullWidth
                       name="password"
                       label="Password"
                       type="password"
                       id="password"
                       autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value='remember' color='primary' />} label='Remember Me'
                    />
                    <Button 
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2}}
                      onClick={(event) => {
                        event.preventDefault(); // Prevent default form submission
                        login();
                      }}
                    >
                      Sign In
                    </Button>
                    <Box>
                     {
                      errorMessage && (
                        <Typography sx={{color: 'red'}}>
                          {errorMessage}
                        </Typography>
                      )
                     }
                    </Box>
                    <Grid container>
                    <Grid item>
                      <Link href="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{mt: 5}} />
                  </Box>
                </Box>
            </Grid>
        </Grid>
   </MainLayout>
  )
}

export default Login