import React, { useEffect, useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout.tsx"
import { Avatar, Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IUser } from "../../Interface/IUser.ts";
import useApiList from "../../Hooks/useApiList.tsx";
import PaginatedComp from "../../Components/Pagination.tsx";

const UserList : React.FC = () => {
    const urlstring : string = '/admin/users'
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {resultList: users, page, count, totalPage, prevPage, nextPage} = useApiList<IUser>(urlstring, currentPage)
    
    useEffect(()=>{
        setCurrentPage(page);
    }, [page])

    const handlPageChange = (page: number)=>{
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
                            Gender
                        </TableCell>
                        <TableCell>
                            Access Time
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users && users.length > 0 ? (
                            users.filter((user : IUser)=> user.role === 'user').map((user : IUser)=>(
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        {user.name}
                                    </TableCell>
                                    <TableCell>
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        {user.gender}
                                    </TableCell>
                                    <TableCell>
                                        {user.createdAt}
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
            <PaginatedComp currentPage={currentPage} totalPage={totalPage} onPageChange={handlPageChange} />
        </Box>
    </DashboardLayout>
  )
}

export default UserList