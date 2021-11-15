import './navbar.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import * as actionType from '../../flux/types/types';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT_SUCCESS });
        navigate('/login');

        setUser(null);
    };

    useEffect(() => {
        setInterval(() => {
            setUser(JSON.parse(localStorage.getItem('profile')));
            const token = user?.token;

            if (token) {
                const decodedToken = jwt_decode<JwtPayload>(token);
                if (decodedToken.exp * 1000 < new Date().getTime()) logout();
            }   
        }, 5000)
    }, []);

    return (
        <AppBar className='navbar' position='fixed'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Ascents
                </Typography>
                {user ?
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h6" component="div">{user?.user.username}</Typography>
                        <Button variant='contained' className='primary button' onClick={() => logout()}>Logout</Button>
                    </Stack>
                    :
                    <Stack direction="row" spacing={1}>
                        <Button component={Link} to='/login' variant='contained' className='primary button'>Login</Button>
                        <Button component={Link} to='/register' variant='contained' className='primary button'>Register</Button>
                    </Stack>
                }
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;