import BaseLayout from '../../components/baseLayout';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const RegisterPage = () => {

    const navigate = useNavigate(); 

    const routeChange = (path: string) => {
        navigate(path);
    }

	var component = 
        <Box component='div' sx={{width: '330px', padding: '50px', textAlign: 'left'}}>
            <Stack spacing={2}>
                <Typography  variant="h4" component="div">
                    Register
                </Typography>
                <TextField id="username" label="Username" className='textField' />
                <TextField id="email" label="Email" className='textField' />
                <TextField id="password" label="Password" type="password" color='secondary' />
                <Button variant="contained" className='primary button'>
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
    ;

	return (
		<BaseLayout component={component} />
	);
};

export default RegisterPage;
