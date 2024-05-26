import { Grid, TextField, Typography, Stack } from '@mui/material'
import host from '../../Data/Data..js';

const OrderList = ({products, handleQty}) => {  
  return (
        <>
            {
                products != null && products.length > 0 ? (
                    <Grid container spacing={2}>
                        <Typography variant='h5' marginLeft={2} marginTop={3}>Order List</Typography>
                        {
                            products.map((product, index)=>(
                                <Grid key={product._id} item container spacing={2}>
                                    <Grid item md={3}>
                                        <img src={`${host.host}/images/${product.image}`} width={150} height={150} />
                                    </Grid>
                                    <Grid item md={4} marginX={'auto'}>
                                        <TextField defaultValue={1} value={product.qty} label='Qty' type='number' variant='standard' size='small' onChange={(e)=> handleQty(index, e.target.value)} />
                                    </Grid>
                                    <Grid item md={4} marginLeft={'auto'}>
                                        <Stack spacing={2}>
                                        <Grid item display={'flex'} justifyContent={'space-between'}>
                                            <Typography variant='subtitle1'>Product Name:</Typography>
                                            <Typography>{product.name}</Typography>
                                        </Grid>
                                        <Grid item display={'flex'} justifyContent={'space-between'}>
                                            <Typography variant='subtitle1'>Price:</Typography>
                                            <Typography>{product.price}</Typography>
                                        </Grid>
                                        <Grid item display={'flex'} justifyContent={'space-between'}>
                                            <Typography variant='subtitle1'>Category:</Typography>
                                            <Typography>{product.category}</Typography>
                                        </Grid>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                    
                ) : (
                    <Typography>
                        No Data Found.
                    </Typography>
                )
            }
        </>
  )
}

export default OrderList