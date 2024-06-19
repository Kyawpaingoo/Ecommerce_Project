import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IReview } from '../Interface/IReview';

const useReviewList = (urlstring : string) :IReview[] | null => {
    const [reviews, setReviews] = useState<IReview[] | null>([]);
  useEffect(()=>{
      const fetchData = async()=>{
        const response =  await axios.get(urlstring);
        setReviews(response.data)
      }
      fetchData();
  },[urlstring])
  return reviews
}

export default useReviewList