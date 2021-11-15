
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import * as actionType from '../../../flux/types/types';
import { login } from '../../../flux/actions/auth';

import {
    Box, Stack, Divider, Typography, TextField, Button, Link,
    FormGroup, FormControlLabel, Checkbox
} from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';

interface ITarget {
    target: {
        value: React.SetStateAction<string>;
    };
    preventDefault(): void;
}

const LoginPage = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        try {
            dispatch(login({ email, password }));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
        
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: actionType.LOGIN_SUCCESS, data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

    const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
    const handleChangePassword = (e: ITarget) => setPassword(e.target.value);
    
    return (
        <form onSubmit={handleOnSubmit}>
            <Box component='div' sx={{ width: '330px', padding: '50px', textAlign: 'left' }}>
                <Stack spacing={2}>
                    <div>
                        <Typography variant="h4" component="div">
                            Sign in
                        </Typography>
                        <Typography sx={{ color: 'var(--color-fadedtext)' }} component="div">
                            or <Link href='' onClick={() => navigate('/register')} underline="none">create an account</Link>
                        </Typography>
                    </div>
                    <TextField id="email" label="Email" className='textField' onChange={(e) => handleChangeEmail(e)} />
                    <TextField id="password" label="Password" type="password" color='secondary' onChange={(e) => handleChangePassword(e)} />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked className='primaryColor' />} label="Remember Me" />
                    </FormGroup>
                    <Button variant="contained" className='primary button' type="submit">
                        Sign in
                    </Button>
                    <Divider sx={{ borderColor: 'var(--color-text)' }}></Divider>
                    <GoogleLogin
                        clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button variant="outlined" startIcon={<GoogleIcon />} className='secondary button' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                Sign in with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Typography sx={{ color: 'var(--color-fadedtext)' }} component="div">
                        <Link href='' underline="none">Forgot your password?</Link>
                    </Typography>
                </Stack>
            </Box>
        </form>
    );
};

export default LoginPage;
