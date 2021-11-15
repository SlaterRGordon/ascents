
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';
import { ILoginModal, ITarget, IAuthReduxProps } from '../../flux/types/interfaces';

import BaseLayout from '../../components/baseLayout';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const LoginPage = ({
    isAuthenticated,
    error,
    login,
    clearErrors
  }: ILoginModal) => {
    const [auth, setAuth] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);

    const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
    const handleChangePassword = (e: ITarget) => setPassword(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();

        // Create user object
        const user = {
            email,
            password
        };
        
        console.log(error);

        // Attempt to login
        login(user);
    };

    useEffect(() => {
        // Check for login error
        if (error.id === 'LOGIN_FAIL') {
            setMsg(error.msg.msg);
        } else {
            setMsg(null);
        }

        const asyncCallback = async () =>{
            if(isAuthenticated) {
                setAuth(true);
            }
        }

        asyncCallback();
        
    }, [error, isAuthenticated]);

    const navigate = useNavigate(); 

    const routeChange = (path: string) => {
        navigate(path);
    }

    if(auth) {
        routeChange('/')
    }

	var component = 
        <form onSubmit={handleOnSubmit}>
            <Box component='div' sx={{width: '330px', padding: '50px', textAlign: 'left'}}>
            {msg ? <Alert severity="error">{msg}</Alert> : null}
                <Stack spacing={2}>
                    <div>
                        <Typography  variant="h4" component="div">
                            Sign in
                        </Typography>
                        <Typography sx={{color: 'var(--color-fadedtext)'}} component="div">
                            or <Link href='' onClick={() => routeChange('/register')} underline="none">create an account</Link>
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
                    <Divider sx={{borderColor: 'var(--color-text)'}}></Divider>
                    <Button variant="outlined" startIcon={<GoogleIcon />} className='secondary button'>
                        Sign in with Google
                    </Button>
                    <Button variant="outlined" startIcon={<AppleIcon />} className='secondary button'>
                        Sign in with Apple
                    </Button>
                    <Button variant="outlined" startIcon={<FacebookIcon />} className='secondary button'>
                        Sign in with Facebook
                    </Button>
                    <Typography sx={{color: 'var(--color-fadedtext)'}} component="div">
                        <Link href='' underline="none">Forgot your password?</Link>
                    </Typography>
                </Stack>
            </Box>
        </form>
    ;

	return (
		<BaseLayout component={component} />
	);
};

const mapStateToProps = (state: IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(
    LoginPage
);
