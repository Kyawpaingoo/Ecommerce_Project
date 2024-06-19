import React from "react";
import DashboardLayout from "../Layout/DashboardLayout.tsx"
import axios from "axios";
import { Avatar, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useReviewList from "../../Hooks/useReviewList.tsx";
const ReviewList : React.FC = () => {

    const urlstring: string = '/review/all'
    const reviews = useReviewList(urlstring);
  
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
                      Email
                  </TableCell>
                  <TableCell>
                      Row
                  </TableCell>
                  <TableCell>
                      Rating
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