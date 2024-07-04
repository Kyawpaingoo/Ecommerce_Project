import React from 'react';
import { AppBar, Badge, Box, MenuItem, Container, CssBaseline, Divider, Drawer, IconButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography, createTheme, Menu, Tooltip, List } from '@mui/material';
import { Inbox, Notifications, Person, Group, Inventory, Reviews, Sell, Home } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import Sidebar from './Sidebar';

type DashboardLayoutProps = {
  children : React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  const authContext = useContext(AuthContext);

  return (
        <Box sx={{display: 'flex'}}>
          <Sidebar authData={authContext} />
            <Box component="main" sx={{ flexGrow: 1, ml: 5, pt: 3, pr:5  }}>
              <Toolbar />
                {children}
            </Box>
        </Box>
  );
};

export default DashboardLayout;
