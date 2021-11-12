import './baseLayout.css';
import Navbar from '../components/navbar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

interface Props {
    component: any;
}

const BaseLayout = (props: Props) => {

    const {
        component
    } = props;

    return (
        <>
            <Navbar title='Ascents' />
            <Toolbar /> 
            <Container className='flex-center'>
                {component}
            </Container>
        </>
    )
};

export default BaseLayout;