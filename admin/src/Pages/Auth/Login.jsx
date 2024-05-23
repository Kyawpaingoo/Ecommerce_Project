import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthContext from '../../Context/AuthContext.jsx';

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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const {setAuthUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async()=>{
        await axios.post('/login', {email, password}).then(({data})=>{
            console.log(data)
            if(data.message== 'email not found'){
                return setErrorMessage('Email not found.')
              }
              if(data.message == 'wrong password'){
                return setErrorMessage('Password not found.')
              }
              if(data.data.role === 'staff' || data.data.role === 'admin'){
               
                setAuthUser(data.data);
                navigate('/')
              }
              else{
                return setErrorMessage('This account is not authorized to use.')
              }
            }).catch((error) => {
              console.error('Error logging in:', error);
        });
    }
  return (
    <Grid container component="main" sx={{height: '50vh', width:'50vh', marginX: 70, marginY: 5}}>
        <Box component={Paper}
            sx={{
                py: 4,
                px: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component='h1' variant="h5">Login</Typography>
                <Box component='form' noValidate sx={{mt: 2}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={e=> setEmail(e.target.value)}
                                autoComplete="given-email"
                                name="Email"
                                required
                                fullWidth
                                id="Email"
                                label="Email"
                                autoFocus
                            />
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
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />} label='Remember Me'
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
                           login();
                         }}
                    >
                        Login
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
                </Box>
                <Copyright sx={{mt: 5}} />
        </Box>
    </Grid>
  )
}

export default Login