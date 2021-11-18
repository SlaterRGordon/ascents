import './navbar.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import * as actionType from '../../flux/types/types';
import { AppBar, Toolbar, Stack, Button, Menu, MenuItem, IconButton, Avatar, Link as MuiLink } from '@mui/material';
import logo from '../../images/logotext.png';

const Navbar = () => {
    const { authData } = useSelector((state: RootStateOrAny) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleClose();
        dispatch({ type: actionType.LOGOUT_SUCCESS });
        navigate('/login');
    };

    if (authData?.token) {
        const decodedToken = jwt_decode<JwtPayload>(authData.token);
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    return (
        <AppBar className='navbar' position='fixed'>
            <Toolbar>
                <div className={'logo-div'}>
                 <img src={logo} alt="icon" height="40px" />
                </div>
                <Stack direction={'row'} spacing={1} sx={{flexGrow: 3, justifyContent: 'center'}}>
                    <MuiLink href="/" className={'link'} underline="none">
                        Home
                    </MuiLink>
                    <MuiLink href="/" className={'link'} underline="none">
                        Training
                    </MuiLink>
                    <MuiLink href="/" className={'link'} underline="none">
                        Explore
                    </MuiLink>
                </Stack>

                {authData ?
                    <Stack direction="row" spacing={1} className={'profile'}>
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                            <Avatar sx={{ width: 32, height: 32, backgroundColor: 'var(--color-primary)' }}>S</Avatar>
                        </IconButton>
                        <Menu
                            id="profileMenu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={() => logout()}>Logout</MenuItem>
                        </Menu>

                    </Stack>
                    :
                    <Stack direction="row" spacing={1} className={'profile'}>
                        <Button component={Link} to='/register' variant='text' sx={{ width: '100px' }} className='textColor button'>Join now</Button>
                        <Button component={Link} to='/login' variant='outlined' sx={{ width: '100px' }} className='secondary button'>Sign in</Button>
                    </Stack>
                }
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;