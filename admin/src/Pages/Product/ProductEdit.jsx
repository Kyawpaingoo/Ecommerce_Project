import DashboardLayout from '../Layout/DashboardLayout.jsx'
import {styled} from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Box, Button, TextField, IconButton, Grid, Typography, Paper, InputLabel, Select, MenuItem, FormControl} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import data from '../../Data/Data..js';

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


const ProductEdit = () => {
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [selectedImage, setSelectedImage] = useState("");
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [gender, setGender] = useState([]);
  const [selectedgender, setSelectedGender] = useState('');
  const [selectedbrand, setSelectedBrand] = useState('');
  const [selectedcategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState([]);
  const [loader, setLoader] = useState(true);
  const [errMessage, setErrMessage] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    let isApiSubscribed = true;
    
    if(isApiSubscribed){
        getData();
    }
    
    return ()=>{
      isApiSubscribed = false;
  }
  },[])

  const getData = async()=>{
    const filterDataRequest = await axios.get('/data/get-filter-data');
    const productRequest = await axios.get('/product/edit/'+id);

    Promise.all([filterDataRequest, productRequest]).then((res)=>{
        const filterData = res[0].data;
        const productData = res[1].data;

        setBrand(filterData.brand);
        setCategory(filterData.category);
        setGender(filterData.gender);
        setColors(filterData.colors);

        setName(productData.name);
        setPrice(productData.price);
        setStock(productData.stock);
        setSelectedBrand(productData.brand);
        setSelectedCategory(productData.category);
        setSelectedGender(productData.gender);
        setSelectedColor(productData.color.map(color => color._id));
        setSelectedImage(productData.image)
    })
  }
  const update = async()=>{
    var formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('price', price);
    formData.append('stock', stock)
    formData.append('brand', selectedbrand);
    formData.append('category', selectedcategory);
    formData.append('color', JSON.stringify(selectedColor));
    formData.append('gender', selectedgender);
    await axios.post('/product/update/'+id, formData).then((d)=>{
        
        if(d.data=== 'success'){
          navigate('/product');
        }
        else{
          setErrMessage('Product Create Failed!');
        }
    })
  }

  const handleFile = (event)=>{
      const file = event.target.files[0];
      console.log(file)
      if(file){
        const reader = new FileReader();
        reader.onload = (e)=>{
          setSelectedImage(e.target.result);
        }
        reader.readAsDataURL(file);
        setImage(file);
      } else{
        console.log('no file')
      }    
  }

  const closeMessage = ()=>{
    setErrMessage('');
}
  return (
    <DashboardLayout>
      <Grid container component={Paper} spacing={4} sx={{ width:'120vh', marginX: 25, marginY: 5, paddingBottom: 4}} elevation={6} square>
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
          <Typography variant='h4' marginBottom={2}>Product Edit Form</Typography>
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
                  <img src={selectedImage.includes('data:image') ? selectedImage : `${data.host}/images/${selectedImage}`} style={{width: 275, height: 275, objectFit:'cover', marginTop: 10}} />
                )
            }
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <Box component='form'>
            <TextField
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
              sx={{width: 550, minWidth: 350}}
              id="name"
              label="Product Name"
              name="name"
              autoComplete="name"
              autoFocus/> 
              
            <TextField
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
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
              value={stock}
              onChange={(e)=>setStock(e.target.value)}
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
                defaultValue={selectedgender}
                  id="gender"
                  value={selectedgender}
                  label="Gender"
                  onChange={(event)=>setSelectedGender(event.target.value)}
                >
                  {
                    gender != null && 
                    gender.map((d)=>(
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
                onChange={(event)=>setSelectedBrand(event.target.value)}
              >
                {
                  brand != null && 
                  brand.map((d)=>(
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
                onChange={(event)=>setSelectedCategory(event.target.value)}
              >
                {
                  category != null && 
                  category.map((d)=>(
                    <MenuItem key={d._id} value={d.category}>
                      {d.category}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            </Box>
            <FormControl sx={{ mt: 1, width: 300 }}>
                {
                    selectedColor.length > 0 && (
                        <>
                            <InputLabel id="color">Color</InputLabel>
                            <Select
                            id="color"
                            value={selectedColor}
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
                        </>
                    )
                }
            </FormControl>
              <Box sx={{ marginTop: 2}}>
                <Button onClick={update} variant='contained' color='success' sx={{marginRight: 2}}>Create</Button>
                <Button variant='contained' color='error'>Cancel</Button>
              </Box>
          </Box>
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}

export default ProductEdit
