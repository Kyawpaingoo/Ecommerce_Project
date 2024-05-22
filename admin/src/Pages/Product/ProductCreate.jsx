import DashboardLayout from '../Layout/DashboardLayout.jsx'
import {styled} from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Box, Button, TextField, Grid, Typography, Paper, InputLabel, Select, MenuItem, FormControl} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import host from '../../Data/Data..js';

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
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [gender, setGender] = useState([]);
  const [selectedgender, setSelectedGender] = useState([]);
  const [selectedbrand, setSelectedBrand] = useState([]);
  const [selectedcategory, setSelectedCategory] = useState([]);
  const [selectedcolor, setSelectedColor] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    let isApiSubscribed = true;
    const getData = async()=>{
      await axios.get('/data/get-filter-data').then((d)=>{
        if(isApiSubscribed){
          setLoader(false);
          setBrand(d.data.brand);
          setCategory(d.data.category);
          setGender(d.data.gender);
          setColors(d.data.colors);
         
        }
      })
    }
    getData();
    return ()=>{
      isApiSubscribed = false;
  }
  },[])

  const handleFile = (event)=>{
      const file = event.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = (e)=>{
          setSelectedImage(e.target.result);
        }
        reader.readAsDataURL(file);
        console.log(file)
      } else{
        console.log('no file')
      }
      
  }
  return (
    <DashboardLayout>
      <Grid container component={Paper} spacing={1} sx={{ width:'120vh', marginX: 25, paddingX: 4, paddingY:  2, marginY: 5}} elevation={6} square>
        <Grid item md={12}>
        <Box>
          <Typography variant='h4' marginBottom={2}>Product Create Form</Typography>
        </Box>
        </Grid>
        
        <Grid item md={4} xs={4}>
            <Button
            component='label'
            role={undefined}
            variant='contained'
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            >
            Upload File
            <VisuallyHiddenInput type='file' onChange={handleFile} />
            </Button>
            {
                selectedImage && (
                  <img src={selectedImage} style={{width: 75, height: 75, objectFit:'cover'}} />
                )
            }
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Box component='form'>
            <TextField
              onChange={e=>setName(e.target.value)}
              required
              fullWidth
              id="name"
              label="Product Name"
              name="name"
              autoComplete="name"
              autoFocus/> 
              
              <TextField
              onChange={e=>setPrice(e.target.value)}
              fullWidth
              required
              label="Price"
              sx={{mt: 2}}
              name='price'
              autoFocus
              id='price'
              type='number'
              autoComplete='price'
            />
            <TextField
              onChange={e=>setPrice(e.target.value)}
              fullWidth
              required
              label="Stock"
              sx={{mt: 2}}
              name='stock'
              autoFocus
              id='stock'
              type='number'
              autoComplete='stock'
            />
            <Box sx={{mt: 2}}>
              <FormControl sx={{minWidth: 120, mr:2}}>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  id="gender"
                  value={selectedgender}
                  label="Gender"
                  onChange={(event)=>setSelectedGender(event.target.value)}
                >
                  {
                    gender != null && 
                    gender.map((d)=>(
                      <MenuItem key={d._id} value={d._id}>
                        {d.gender}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
              <FormControl sx={{minWidth: 120, mr:2}}>
              <InputLabel id="brand">Brand</InputLabel>
              <Select
                id="brand"
                value={selectedbrand}
                label="Brand"
                onChange={(event)=>setSelectedBrand(event.target.value)}
              >
                {
                  brand != null && 
                  brand.map((d)=>(
                    <MenuItem key={d._id} value={d._id}>
                      {d.brand}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: 120, mr:2}}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                id="brand"
                value={selectedcategory}
                label="Category"
                onChange={(event)=>setSelectedCategory(event.target.value)}
              >
                {
                  category != null && 
                  category.map((d)=>(
                    <MenuItem key={d._id} value={d._id}>
                      {d.category}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            </Box>
            <FormControl sx={{ mt: 1, width: 300 }}>
                <InputLabel id="color">Color</InputLabel>
                <Select
                  id="color"
                  value={selectedcolor}
                  multiple
                  label="color"
                  onChange={(event)=>setSelectedColor(event.target.value)}
                >
                    {
                      colors != null && 
                      colors.map((d)=>(
                        <MenuItem key={d._id} value={d._id}>
                          {d.color}
                        </MenuItem>
                      ))
                    }
                </Select>
            </FormControl>
              <Box sx={{ marginTop: 2}}>
                <Button variant='contained' color='success' sx={{marginRight: 2}}>Create</Button>
                <Button variant='contained' color='error'>Cancel</Button>
              </Box>
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}

export default ProductCreate