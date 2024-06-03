import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const carouselItems = [
    {
        id: 1,
        imageUrl: '/images/carousel.jpg'
    },
    {
        id: 2,
        imageUrl: '/images/carousel2.jpg'
    },
    {
        id: 3,
        imageUrl: '/images/carousel3.jpg'
    }
]

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = ()=>{
        const index = currentIndex == 0 ? carouselItems.length - 1 : currentIndex - 1;
        setCurrentIndex(index)
    }

    const handleNext = () =>{
        const index = currentIndex == carouselItems.length -1 ? 0 : currentIndex + 1;
        setCurrentIndex(index);
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            handleNext();
        },3000);
        return ()=> clearInterval(interval)
    },[currentIndex])
  return (
    <Box
      position='relative'
      display='flex'
      height='84vh'
      width='100%'
      flexDirection='column'
    
    >
      <Box display="flex" alignItems="center" width="70%" marginX={10}>
        <Button variant="contained" color="primary" onClick={handlePrev}>
          <ArrowBackIosIcon />
        </Button>
        <Box flex="1" display="flex" justifyContent="center">
          <img
            src={carouselItems[currentIndex].imageUrl}
            alt={`Slide ${carouselItems[currentIndex].id}`}
            style={{ width: '1200px', height: 'auto', objectFit: 'cover', margin: '0' }}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleNext}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  )
}

export default ImageCarousel