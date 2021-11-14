import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import {
    IRegisterModal,
    ITarget,
    IAuthReduxProps
} from '../../types/interfaces';

import BaseLayout from '../../components/baseLayout';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

const RegisterPage = ({
    isAuthenticated,
    error,
    register,
    clearErrors
  }: IRegisterModal) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);

    const handleChangeName = (e: ITarget) => setName(e.target.value);
    const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
    const handleChangePassword = (e: ITarget) => setPassword(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
    
        // Create user object
        const user = {
            name,
            email,
            password
        };
    
        // Attempt to login
        register(user);
    };

    useEffect(() => {
        // Check for register error
        if (error.id === 'REGISTER_FAIL') {
            setMsg(error.msg.msg);
        } else {
            setMsg(null);
        }

    }, [error, isAuthenticated]);

	var component = 
        <form onSubmit={handleOnSubmit}>
            <Box component='div' sx={{width: '330px', padding: '50px', textAlign: 'left'}}>
                {msg ? <Alert severity="error">{msg}</Alert> : null}
                <Stack spacing={2}>
                    <Typography  variant="h4" component="div">
                        Register
                    </Typography>
                    <TextField id="username" label="Username" className='textField' onChange={(e) => handleChangeName(e)} />
                    <TextField id="email" label="Email" className='textField' onChange={(e) => handleChangeEmail(e)} />
                    <TextField id="password" label="Password" type="password" color='secondary' onChange={(e) => handleChangePassword(e)} />
                    <Button variant="contained" className='primary button' type='submit' >
                        Sign up
                    </Button>
                    <Divider sx={{borderColor: 'var(--color-text)'}}></Divider>
                    <Button variant="outlined" startIcon={<GoogleIcon />} className='secondary button'>
                        Sign up with Google
                    </Button>
                    <Button variant="outlined" startIcon={<AppleIcon />} className='secondary button'>
                        Sign up with Apple
                    </Button>
                    <Button variant="outlined" startIcon={<FacebookIcon />} className='secondary button'>
                        Sign up with Facebook
                    </Button>
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

export default connect(mapStateToProps, { register, clearErrors })(
    RegisterPage
);