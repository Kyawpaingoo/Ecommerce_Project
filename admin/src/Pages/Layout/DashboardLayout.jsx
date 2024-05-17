import { AppBar, Badge, Box, MenuItem, Container, CssBaseline, Divider, Drawer, IconButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography, createTheme, Menu, Tooltip, List, ListItem } from '@mui/material';
import { Inbox, Notifications, Person, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';

const defaultTheme = createTheme();

const DashboardLayout = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { authUser, setAuthUser } = useContext(AuthContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    await axios.post('/logout').then((data) => {
      if (data.data === 'success') {
        setAuthUser(false);
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, paddingLeft: '150px'}}>
              Admin Dashboard
            </Typography>
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={3} color="error">
                <Inbox />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={7} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            {!authUser ? (
              <MenuItem component={Link} to="/login">
                Login
              </MenuItem>
            ) : (
              <MenuItem sx={{ flexGrow: 0 }}>
                <Tooltip title="Open Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Person />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography>
                      <Link to="/" onClick={logout} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Logout
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </MenuItem>
            )}
            <IconButton color="inherit">
              <Settings />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            <MenuItem component={Link} to="/">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </MenuItem>
            <MenuItem component={Link} to="/customers">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </MenuItem>
            <MenuItem component={Link} to="/product">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </MenuItem>
            <MenuItem component={Link} to="/orders">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </MenuItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            {props.children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardLayout;
