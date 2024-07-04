import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AuthContextType } from '../../Context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Group, Home, Inbox, Notifications, Person, Reviews, Sell, ShoppingCart } from '@mui/icons-material';
import { AppBar,Drawer, Tooltip, Badge, MenuItem, Menu } from '@mui/material';

const drawerWidth = 240;


type SideBarProps = {
    authData: AuthContextType;
}
const Sidebar: React.FC<SideBarProps> = ({authData})=> {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const AuthContext = authData;

  const navigate = useNavigate();

  const sidbarItems = [['Dashboard','', <Home />]];
  if(AuthContext.authUser){
    sidbarItems.push(['Products','product', <Sell />]);
    if(AuthContext.authUser.role == 'admin'){
      sidbarItems.push(['Users','user', <Group />]);
      sidbarItems.push(['Orders','order', <ShoppingCart />]);
      sidbarItems.push(['Reviews','review', <Reviews />]);
    }
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async()=>{
    await axios.post('/logout').then((data)=>{
      if(data.data === 'success'){
        AuthContext.setAuthUser(false);
        navigate('/login');
      }
    })
  }

  const handleRedirect = (link)=>{
    navigate(`/${link}`);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color={'default'} sx={{
        width: `calc(100% - ${drawerWidth}px)`,
      }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
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
            <MenuItem >
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
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" color='primary' sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}>
        <Toolbar />
        <Divider />
        <List>
            {
                sidbarItems.map(([text, link, icon], index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                        onClick={(event)=>{
                            event.preventDefault();
                            event.stopPropagation();
                            setOpen(false);
                            handleRedirect(link);
                            //setOpen(open => !open);
                        }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white', minWidth: 0, mr:  3 , justifyContent: 'center' }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ color: 'white' }} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
      </Drawer>
    </Box>
  );
}


export default Sidebar;