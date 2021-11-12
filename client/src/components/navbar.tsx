import './navbar.css';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface Props {
	title: string;
}

const Navbar = (props: Props) =>{

    const {
		title
    } = props;

    const navigate = useNavigate(); 

    const routeChange = (path: string) => {
        navigate(path);
    }

    return (
        <AppBar className='navbar' position='fixed'>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                <Stack direction="row" spacing={1}>
                    <Button variant='contained' className='primary button' onClick={() => routeChange('/login')}>Login</Button>
                    <Button variant='contained' className='primary button' onClick={() => routeChange('/register')}>Register</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;