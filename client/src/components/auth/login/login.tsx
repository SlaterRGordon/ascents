import '../auth.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { login, loginGoogle } from '../../../flux/actions/auth';

import {
    Box, Stack, Divider, Typography, TextField, Button, Link,
    FormGroup, FormControlLabel, Checkbox, Paper
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

interface ITarget {
    target: {
        value: React.SetStateAction<string>;
    };
    preventDefault(): void;
}

const LoginPage = () => {
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
            dispatch(loginGoogle({ result, token }));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

    const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
    const handleChangePassword = (e: ITarget) => setPassword(e.target.value);

    return (
        <form onSubmit={handleOnSubmit} className={'flex-center'}>
            <Paper elevation={6} className="authForm">
                <Box component='div' sx={{ width: '330px', padding: '50px', textAlign: 'left' }}>
                    <Stack spacing={2}>
                        <div>
                            <Typography variant="h4" component="div">
                                Sign in
                            </Typography>
                            <Typography sx={{ color: 'var(--color-text)' }} component="div">
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
                        <Divider sx={{ borderColor: 'var(--color-fadedtext)' }}></Divider>
                        <GoogleLogin
                            clientId="316396612075-b5o9080lal58i8tqe7pj3sfmlvui22md.apps.googleusercontent.com"
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
            </Paper>
        </form>
    );
};

export default LoginPage;
