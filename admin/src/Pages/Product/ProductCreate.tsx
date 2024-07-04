import React, { ChangeEvent } from 'react';
import DashboardLayout from '../Layout/DashboardLayout.tsx'
import {styled} from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Box, Button, TextField, IconButton, Grid, Typography, Paper, InputLabel, Select, MenuItem, FormControl, SelectChangeEvent} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import useFilterData from '../../Hooks/useFilterData.tsx';

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


const ProductCreate : React.FC = () => {
  const [price, setPrice] = useState<string>('');
  const [stock, setStock] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedgender, setSelectedGender] = useState<string>('');
  const [selectedbrand, setSelectedBrand] = useState<string>('');
  const [selectedcategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [errMessage, setErrMessage] = useState<string>('');
  const navigate = useNavigate();

  const filterList = useFilterData('/data/get-filter-data')

  const store = async()=>{
    var formData = new FormData();
    formData.append('name', name);
    formData.append('image', image as Blob);
    formData.append('price', price);
    formData.append('stock', stock)
    formData.append('brand', selectedbrand);
    formData.append('category', selectedcategory);
    formData.append('color', JSON.stringify(selectedColor));
    formData.append('gender', selectedgender);

    //console.log(formData);
    await axios.post('/product/store', formData).then((d)=>{
        if(d.data === 'success'){
          navigate('/product');
        }
        else{
          setErrMessage('Product Create Failed!');
        }
    })
  }

  const handleFile = (event : ChangeEvent<HTMLInputElement>)=>{
      const file = event.target.files?.[0];
      if(file){
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>)=>{
          if(event.target){
            setSelectedImage(event.target.result as string);
          }
        }
        reader.readAsDataURL(file);
        setImage(file);
      } else{
        console.log('no file')
      }    
  }

  const handleCancelClick = ()=>{
    navigate('/product');
  }

  const closeMessage = () => void setErrMessage('');
  return (
    <DashboardLayout>
      <Grid container component={Paper} spacing={4} sx={{ width:'120vh', marginX: 15, marginY: 5, paddingBottom: 4}} elevation={6} square>
        <Grid item md={12}>
        {
            errMessage && (
                <Box sx={{width: '100%', marginY: 2, backgroundColor: '#d32f2f'}} display={'flex'}>
                    <Typography paddingY={1} paddingLeft={2} color={'white'}>{errMessage}</Typography>
                    <IconButton onClick={closeMessage} sx={{marginLeft:'auto'}}>
                        <CloseIcon sx={{color: 'white'}}  />
                    </IconButton>
                </Box>
            )
        }
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
            fullWidth
            >
            Upload File
            <VisuallyHiddenInput type='file' onChange={handleFile} />
            </Button>
            {
                selectedImage && (
                  <img src={selectedImage} style={{width: 275, height: 275, objectFit:'cover', marginTop: 10}} />
                )
            }
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Box component='form'>
            <TextField
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName(event.target.value)}
              required
              sx={{width: 550, minWidth: 350}}
              id="name"
              label="Product Name"
              name="name"
              autoComplete="name"
              autoFocus/> 
              
              <TextField
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setPrice(event.target.value)}
              required
              label="Price"
              sx={{mt: 2, width: 550, minWidth: 350}}
              name='price'
              autoFocus
              id='price'
              type='number'
              autoComplete='price'
            />
            <TextField
              onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setStock(event.target.value)}
              required
              label="Stock"
              sx={{mt: 2, width: 550, minWidth: 350}}
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
                  onChange={(event: SelectChangeEvent<string>)=>setSelectedGender(event.target.value)}
                >
                  {
                    filterList?.gender && 
                    filterList.gender.map((d)=>(
                      <MenuItem key={d._id} value={d.gender}>
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
                onChange={(event: SelectChangeEvent<string>)=>setSelectedBrand(event.target.value)}
              >
                {
                  filterList?.brand &&
                  filterList.brand.map((d)=>(
                    <MenuItem key={d._id} value={d.brand}>
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
                onChange={(event: SelectChangeEvent<string>)=>setSelectedCategory(event.target.value)}
              >
                {
                  filterList?.category && 
                  filterList.category.map((d)=>(
                    <MenuItem key={d._id} value={d.category}>
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
                  value={selectedColor}
                  multiple
                  label="color"
                  onChange={(event : SelectChangeEvent<string[]>)=>setSelectedColor(event.target.value as string[])}
                >
                    {
                      filterList?.colors && 
                      filterList.colors.map((d)=>(
                        <MenuItem key={d._id} value={d._id}>
                          {d.color}
                        </MenuItem>
                      ))
                    }
                </Select>
            </FormControl>
              <Box sx={{ marginTop: 2}}>
                <Button onClick={store} variant='contained' color='success' sx={{marginRight: 2}}>Create</Button>
                <Button onClick={handleCancelClick} variant='contained' color='error'>Cancel</Button>
              </Box>
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}

export default ProductCreate