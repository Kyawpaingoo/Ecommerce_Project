import React from "react";
import DashboardLayout from "../Layout/DashboardLayout.tsx"
import { Avatar, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IUser } from "../../Interface/IUser.ts";
import useUserList from "../../Hooks/useUserList.tsx";

const UserList : React.FC = () => {
    const urlstring : string = '/admin/users'
    const userList = useUserList(urlstring);
    
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
                        Gender
                    </TableCell>
                    <TableCell>
                        Access Time
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    userList && userList.length > 0 ? (
                        userList.filter((user : IUser)=> user.role === 'user').map((user : IUser)=>(
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
    </DashboardLayout>
  )
}

export default UserList