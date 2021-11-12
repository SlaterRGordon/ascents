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

interface Props {

}

const LoginPage = (props: Props) => {

    const navigate = useNavigate(); 

    const routeChange = (path: string) => {
        navigate(path);
    }

	var component = 
        <Box component='div' sx={{width: '330px', padding: '50px', textAlign: 'left'}}>
            <Stack spacing={2}>
                <div>
                    <Typography  variant="h4" component="div">
                        Sign in
                    </Typography>
                    <Typography sx={{color: 'var(--color-fadedtext)'}} component="div">
                        or <Link href='' onClick={() => routeChange('/register')} underline="none">create an account</Link>
                    </Typography>
                </div>
                <TextField id="email" label="Email" className='textField' />
                <TextField id="password" label="Password" type="password" color='secondary' />
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked className='primaryColor' />} label="Remember Me" />
                </FormGroup>
                <Button variant="contained" className='primary button'>
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
    ;

	return (
		<BaseLayout component={component} />
	);
};

export default LoginPage;
