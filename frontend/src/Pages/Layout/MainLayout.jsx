import { Box, CssBaseline, createTheme } from '@mui/material'
import {Container} from '@mui/material'
import NavbarComponent from './NavbarComponent.jsx'
import { ThemeProvider } from '@emotion/react'

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
        
      </ThemeProvider>
    </Container>
  )
}

export default MainLayout