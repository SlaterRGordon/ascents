import './baseLayout.css';
import Navbar from '../components/navbar';

interface Props {

}

const BaseLayout = (props: Props) =>{

    return (
        <div className='baseLayout'>
            <Navbar title='Ascents' />
        </div>
    )
};

export default BaseLayout;