import MainLayout from './Layout/MainLayout.jsx'
import { Box, Button,Grid, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import axios from 'axios';

const Contact =  () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
  
    const store = async ()=>{
        setLoader(true);
        await axios.post('/contact/store', {name,email, description}).then(({data})=>{
        setLoader(false);
        console.log(data);
        if(data.message== 'email not found'){
            return setErrorMessage('Email not found.')
        }
        if(data.message == 'wrong password'){
            return setErrorMessage('Password not found.')
        }

        if(data.message == 'success'){
            console.log('Login Success');
        }
        }).catch((error) => {
        console.error('Error logging in:', error);
        });
    }
  return (
    <MainLayout>
        <Grid container component="main" sx={{height: '50vh', width:'150vh', marginX: 35, marginY: 5}}>
            <Grid
                item
                xs={false}
                sm={4}
                md={4}
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
                  my: 4,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                  <Typography component='h1' variant='h5'>
                    Contact Us
                  </Typography>
                  <Box component='form' noValidate sx={{mt: 1}}>
                    <TextField 
                      onChange={e=>setName(e.target.value)}
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Your Name"
                      name="name"
                      autoComplete="name"
                      autoFocus 
                    />
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
                      onChange={e=>setDescription(e.target.value)}
                       margin="normal"
                       required
                       fullWidth
                       name="description"
                       label="Write Message"
                       type="text"
                       id="description"
                       multiline
                        rows={4}
                    />
                    <Button 
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2}}
                      onClick={(event) => {
                        event.preventDefault(); // Prevent default form submission
                        store();
                      }}
                    >
                      Send Message
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
                  </Box>
                </Box>
            </Grid>
        </Grid>
   </MainLayout>
  )
}

export default Contact