import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../Context/AuthContext.jsx';

const pages = ['Product', 'Review', 'Contact'];

const NavbarComponent = () => {
    const {authUser, setAuthUser} = useContext(AuthContext);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();

    // const redirectPage = (page) =>{
    //   console.log(page);
    //   navigate(`/${page}`);
    // }

    console.log(authUser)
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    const logout = async ()=>{
      await axios.post('/logout').then((data)=>{
        if(data.data == 'success'){
          setAuthUser(false);
          navigate('/login');
        }
      })
    }
  return (
    <AppBar position='static'>
        <Container maxWidth="xl">
            <Toolbar>
                <Typography 
                    variant='h6'
                    noWrap
                    component='a'
                    href='#'
                    sx={{
                        mr: 2,
                        display: {xs:  'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '0.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        flexGrow: 1
                    }}
                >
                Logo
                </Typography>

                <Box sx={{flexGrow: 0, display: {xs: 'flex', md:'none'}}}>
                    <IconButton 
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleOpenNavMenu}
                        color='inherit'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {
                            pages.map((page)=>(
                                <MenuItem key={page} component={Link} to={`/${page}`}>
                                  <Typography textAlign='center'>{page}</Typography>
                                </MenuItem>
                            ))
                        }
                    </Menu> 
                </Box>

                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link} to={`/${page}`}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          
          {
              authUser && (
                <MenuItem sx={{flexGrow: 0}}>
                  <Tooltip title="Open Settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <PersonIcon />
                    </IconButton>
                    
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem>
                      <Typography textAlign='center'>
                        <Link onClick={logout} style={{textDecoration: 'none', color: 'black'}}>
                          My Order
                        </Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography textAlign='center'>
                      <Link onClick={logout} style={{textDecoration: 'none', color: 'black'}}>
                          WishList
                        </Link>
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography textAlign='center'>
                      <Link onClick={logout} style={{textDecoration: 'none', color: 'black'}}>
                          Logout
                        </Link>
                      </Typography>
                    </MenuItem>
                  </Menu>
                </MenuItem>
              ) 
          }
          {
            !authUser && (
              <MenuItem component={Link} to={"/login"}>
                  Login
              </MenuItem>
            )
          }
          </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default NavbarComponent