import { useEffect, useState } from "react"
import DashboardLayout from "../Layout/DashboardLayout.jsx"
import axios from "axios";
import { Avatar, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const UserList = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get('/admin/').then((d)=>{
                setUsers(d.data);
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
                    users && users.length > 0 ? (
                        users.filter((user)=> user.role === 'staff').map((user)=>(
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
                                    {user.email}
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