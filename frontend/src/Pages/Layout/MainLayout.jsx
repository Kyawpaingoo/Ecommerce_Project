import { Box, CssBaseline, createTheme } from '@mui/material'
import {Container} from '@mui/material'
import NavbarComponent from './NavbarComponent.jsx'
import { ThemeProvider } from '@emotion/react'
import Footer from './Footer.jsx';

const dafaultTheme = createTheme();''
const MainLayout = (props) => {
  return (
    <Container maxWidth="xl" disableGutters>
      <CssBaseline />
      <ThemeProvider theme={dafaultTheme}>
      <NavbarComponent />
      <Box>
      {props.children}
      </Box>
        <Footer />  
      </ThemeProvider>
    </Container>
  )
}

export default MainLayout