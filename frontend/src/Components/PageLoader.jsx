import { Box, CircularProgress } from '@mui/material'

const PageLoader = () => {
  return (
    <Box sx={{display: 'flex'}}>
        <CircularProgress />
    </Box>
  )
}

export default PageLoader