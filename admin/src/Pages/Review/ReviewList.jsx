import { useEffect, useState } from "react"
import DashboardLayout from "../Layout/DashboardLayout.jsx"
import axios from "axios";
import { Avatar, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const ReviewList = () => {
const [reviews, setReviews] = useState([]);
  useEffect(()=>{
      const fetchData = async()=>{
          await axios.get('/review/all').then((d)=>{
            setReviews(d.data);
          })
      }
      fetchData();
  },[])
  
return (
  <DashboardLayout>
      <Table>
          <TableHead>
              <TableRow>
                  <TableCell>
                      Image
                  </TableCell>
                  <TableCell>
                      Name
                  </TableCell>
                  <TableCell>
                      Name
                  </TableCell>
                  <TableCell>
                      Row
                  </TableCell>
                 
              </TableRow>
          </TableHead>
          <TableBody>
              {
                  reviews && reviews.length > 0 ? (
                      reviews.map((review)=>(
                          <TableRow key={review._id}>
                              <TableCell>
                                  <Avatar>
                                      <AccountCircleIcon />
                                  </Avatar>
                              </TableCell>
                              <TableCell>
                                  {review.name}
                              </TableCell>
                              <TableCell>
                                  {review.email}
                              </TableCell>
                              <TableCell>
                                  {review.review}
                              </TableCell>
                              <TableCell>
                                  {review.rating}
                              </TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <Typography>
                          No User Here.
                      </Typography>
                  )
              }
          </TableBody>
      </Table>
  </DashboardLayout>
)
}

export default ReviewList