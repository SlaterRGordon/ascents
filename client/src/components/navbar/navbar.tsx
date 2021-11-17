import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import * as actionType from '../../flux/types/types';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';

const Navbar = () => {
    const { authData } = useSelector((state: RootStateOrAny) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Ascents
                </Typography>
                {authData ?
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h6" component="div"></Typography>
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