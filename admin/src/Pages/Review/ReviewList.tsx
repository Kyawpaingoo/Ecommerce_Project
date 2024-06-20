import React, { useEffect, useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout.tsx"
import axios from "axios";
import { Avatar, Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useReviewList from "../../Hooks/useReviewList.tsx";
import useApiList from "../../Hooks/useApiList.tsx";
import { IReview } from "../../Interface/IReview.ts";
import PaginatedComp from "../../Components/Pagination.tsx";
const ReviewList : React.FC = () => {
    const urlstring: string = '/review/all'
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {resultList: reviews, page, totalPage} = useApiList<IReview>(urlstring, currentPage);
    
    useEffect(()=>{
        setCurrentPage(page);
    })

    const handlePageChange = (page: number)=>{
        setCurrentPage(page)
    }
return (
  <DashboardLayout>
    <Box sx={{height: '600px'}}>
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
    </Box>
      
    <Box marginTop={4}>
        <PaginatedComp currentPage={currentPage} totalPage={totalPage} onPageChange={handlePageChange} />
    </Box>
  </DashboardLayout>
)
}

export default ReviewList