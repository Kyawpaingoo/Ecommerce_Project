import DashboardLayout from '../Layout/DashboardLayout.jsx'
import {styled} from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Container, Box, Button, TextField} from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const ProductCreate = () => {
  return (
    <DashboardLayout>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Box component='form' sx={{mt: 1}}>
              <TextField margin="normal"
              required
              fullWidth
              id="name"
              label="Product Name"
              name="name"
              autoComplete="name"
              autoFocus/>
              <Button
                component='label'
                role={undefined}
                variant='contained'
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload File
                <VisuallyHiddenInput type='file' />
              </Button>
              
            </Box>
        </Box>
      </Container>
    </DashboardLayout>
  )
}

export default ProductCreate