import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import * as actionType from '../../flux/types/types';
import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material';
import logo from '../../images/logotext.png';

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
                <Link to="/" className={'logo'}>
                    <img src={logo} alt="icon" height="40px" />
                </Link>
                {authData ?
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h6" component="div">{authData.user.username}</Typography>
                        <Button variant='outlined' sx={{width: '100px'}} className='secondary button' onClick={() => logout()}>Logout</Button>
                    </Stack>
                    :
                    <Stack direction="row" spacing={1}>
                        <Button component={Link} to='/register' variant='text' sx={{width: '100px'}} className='textColor button'>Join now</Button>
                        <Button component={Link} to='/login' variant='outlined' sx={{width: '100px'}} className='secondary button'>Sign in</Button>
                    </Stack>
                }
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;