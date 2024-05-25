import { useEffect, useState } from 'react'
import MainLayout from './Layout/MainLayout.jsx'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material'
import axios from 'axios';
import { useSearchParams, Link } from 'react-router-dom';
import PageLoader from '../Components/PageLoader.jsx';
import host from '../Data/Data..js';

const item_height = 20;
const item_padding_top = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: item_height * 4.5 + item_padding_top,
            width: 250,
        }
    }
}

const Product = () => {
    const [loader ,setLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');
    const [genders, setGenders] = useState([]);
    const [categories, setCategoreis] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();

    const nameQuery = searchParams.get('name') ?? '';
    const genderQuery = searchParams.get('gender') ?? '';
    const categoryQuery = searchParams.get('category') ?? '';
    const brandQuery = searchParams.get('brand') ?? '';

    const queryStringUrl = `?name=${nameQuery}&gender=${genderQuery}&color=${colors}&category=${categoryQuery}&brand=${brandQuery}`;

    useEffect(()=>{
        let isApiSubscribed = true;
        const getData = async ()=>{
            try{
                setLoader(true);
                const filterRequest = await axios.get("/data/get-filter-data");
                const productRequest = await axios.get("/product/all" + queryStringUrl + `&page=${page}`);
    
                // const sampleData = await Promise.all([filterRequest, productRequest]);
    
                //console.log(sampleData);
                const [filterData, productList] = await Promise.all([filterRequest, productRequest]);
                if(isApiSubscribed){
                    setGenders(filterData.data.gender);
                    setBrands(filterData.data.brand);
                    setCategoreis(filterData.data.category);
                    setTotalPages(productList.data.totalPages);
                    const productData = productList.data.docs;
                    setProducts(productData);
                    
                    console.log(productList.data);
                    console.log(products);
                    setLoader(false);
                }   
                
            }
            catch(error){
                console.log("Error fetching data: ", error);
                if(isApiSubscribed){
                    setLoader(false);
                }
            } finally {
                if(isApiSubscribed){
                    setLoader(false);
                }
            }
        }
        getData();
        return ()=>{
            isApiSubscribed = false;
        }
    },[queryStringUrl, page]);


    const handleGenderChange = (event) =>{
        const {target: {value}} = event;
        setGenders(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleCategoryChange = (event) =>{
        const {target: {value}} = event;
        setCategoreis(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleBrandChange = (event) =>{
        const {target: {value}} = event;
        setBrands(
            typeof value === 'string' ? value.split(',') : value,
        );
    }
  return (
    <MainLayout>
        <Container>
            <Box sx={{marginY:2}}>
                <FormControl sx={{ m:1, width: 100}} size='small'>
                    <InputLabel id="multiple-gender-label">Gender</InputLabel>
                    <Select
                        labelId='multiple-gender-label'
                        multiple
                        value={genders}
                        onChange={handleGenderChange}
                        input={<OutlinedInput  label='Gender' />}
                        MenuProps={MenuProps}
                    >
                        {
                            genders.map((gender)=>(
                                <MenuItem key={gender._id} value={gender._id}>{gender.gender}</MenuItem>
                            ))
                        }
                        
                    </Select>
                </FormControl>

                <FormControl sx={{ m:1, width: 150}} size='small'>
                    <InputLabel id="multiple-category-label">Category</InputLabel>
                    <Select
                        labelId='multiple-category-label'
                        multiple
                        value={categories}
                        onChange={handleCategoryChange}
                        input={<OutlinedInput  label='Category' />}
                        MenuProps={MenuProps}
                    >
                        {
                            categories.map((category)=>(
                                <MenuItem key={category._id} value={category._id}>{category.category}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl sx={{ m:1, width: 100}} size='small'>
                    <InputLabel id="multiple-brand-label">Brand</InputLabel>
                    <Select
                        labelId='multiple-brand-label'
                        multiple
                        value={brands}
                        onChange={handleBrandChange}
                        input={<OutlinedInput  label='Brand' />}
                        MenuProps={MenuProps}
                    >
                        {
                            brands.map((brand)=>(
                                <MenuItem key={brand._id} value={brand._id}>{brand.brand}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>

            <Grid container columns={{sx: 4, md: 12}} spacing={2} sx={{marginY:3}}>
                {
                    loader ? (
                        <PageLoader />
                    ) : (
                        products.length > 0 ? (
                            products.map((data)=>(
                                <Grid key={data._id} item md={4} xs={6}>
                                    <Card>
                                        <CardMedia component='img' sx={{height: {xs: 50, md: 300}}}  image={`${host.host}/images/${data.image}`} />
                                        <CardContent>
                                            <Typography gutterBottom variant='h5' component='div'>
                                                {data.name} 
                                            </Typography>
                                            <Typography variant='body1'>
                                                $ {data.price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size='small'>
                                                <Typography  sx={{display:{xs: 'none', md: 'inline'}}}>
                                                Add to Cart
                                                </Typography>
                                            </Button>
                                            <Button size='small'>
                                            <Typography  sx={{display:{xs: 'none', md: 'inline'}}}>
                                                Buy Now
                                                </Typography>
                                            </Button>
                                            <Button component={Link} to={`/productDetail/${data._id}`} sx={{flexGrow: 0}}>
                                                <Typography variant='body2' sx={{display:{xs: 'none', md: 'inline'}}}>
                                                View Detail
                                                </Typography>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Box sx={{ display: 'flex'}}>
                                <Typography>
                                    No Post Found.
                                </Typography>
                            </Box>
                        )
                    )
                }
                
            </Grid>
        </Container>
    </MainLayout>
  )
}

export default Product