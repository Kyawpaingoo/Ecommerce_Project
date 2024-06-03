import { Box,Button, Container, Grid, Typography } from "@mui/material"
import MainLayout from "./Layout/MainLayout.jsx"
import {useState } from "react";

const ImageWithButton = ({imgUrl}) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      position="relative"
      width={250}
      height={250}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={imgUrl}
        alt="Recommendation"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {hover && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(0, 0, 0, 0.8)"
          style={{
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
           <Button
              variant="outlined"
              style={{
                color: 'white',
                borderColor: 'white',
              }}
            >
              Click Me
            </Button>
        </Box>
      )}
    </Box>
  );
};

const Home = () => {

  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Box marginTop={4}>
          <Typography variant="h6">Recommendatin For you</Typography>
          <Grid container spacing={1} marginTop={2}>
            <Grid item md='3'>
                <ImageWithButton imgUrl={'/images/recommendation1.jpg'} />
            </Grid>
            <Grid item md='3'>
              <ImageWithButton imgUrl={'/images/recommendation2.jpg'} />
            </Grid>
            <Grid item md='3'>
            <ImageWithButton imgUrl={'/images/recommendation3.jpg'} />
            </Grid>
            <Grid item md='3'>
            <ImageWithButton imgUrl={'/images/recommendation4.jpg'} />
            </Grid>
          </Grid>
        </Box>

        <Box marginTop={4}>
          <Typography variant="h3" marginBottom={2}><bold>Get Discount Here</bold></Typography>
          <Grid container spacing={2}>
            <Grid item md={8}>
                <img src={'/images/poster1.jpg'} width='100%'/>
            </Grid>
            <Grid item md={4}>
              <img src={'/images/poster2.jpg'} width='100%' />
            </Grid>
          </Grid>
        </Box>
        
        <Box marginTop={4}>
        <Typography variant="h5" marginBottom={2}><bold>Follow us on Instagram</bold></Typography>
          <Grid container spacing={1} marginTop={2}>
              <Grid item md='3'>
                  <ImageWithButton imgUrl={'/images/pose.jpg'} />
              </Grid>
              <Grid item md='3'>
                <ImageWithButton imgUrl={'/images/pose2.jpg'} />
              </Grid>
              <Grid item md='3'>
                <ImageWithButton imgUrl={'/images/pose3.jpg'}  />
              </Grid>   
              <Grid item md='3'>
              <ImageWithButton imgUrl={'/images/pose4.jpg'} />
              </Grid>
            </Grid>
        </Box>
      </Container>
     
    </MainLayout>
  )
}

export default Home