import { Box, Container, Grid, IconButton, Link, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
        component='footer'
        sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            py: 4,
            mt: 4
        }}
    >
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Typography variant='h6' gutterBottom>
                        IDEL
                    </Typography>
                    <Typography>
                        123, Innovation Way, Suite 500, New York, CA 90210, USA
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography>
                        Quick Links
                    </Typography>
                    <Link href='/' color='inherit' variant='body2' display='block' gutterBottom>
                        Home
                    </Link>
                    <Link href='/product' color='inherit' variant='body2' display='block' gutterBottom>
                        Product
                    </Link>
                    <Link href='/contact' color='inherit' variant='body2' display='block' gutterBottom>
                        Contact Us
                    </Link>
                    <Link href='/review' color='inherit' variant='body2' display='block' gutterBottom>
                        Review
                    </Link>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant='h6' gutterBottom>
                        Follow Us
                    </Typography>
                    <Box display='flex' justifyContent='start'>
                        <IconButton href='#' color='inherit'>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href='#' color='inherit'>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton href='#' color='inherit'>
                            <InstagramIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <Box textAlign='center' mt={4}>
                <Typography variant='body2'>
                    &copy; {new Date().getFullYear()} IDEL Inc. All rights reserved.
                </Typography>
            </Box>
        </Container>
    </Box> 
  )
}

export default Footer