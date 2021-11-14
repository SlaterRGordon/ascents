import { Fragment } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { ILogoutProps } from '../../types/interfaces';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import store from '../../store';
export const Logout = ({ logout }: ILogoutProps) => {

    const navigate = useNavigate(); 

    const routeChange = (path: string) => {
        navigate(path);
    }

    useEffect(() => {
        if(!store.getState().auth.isAuthenticated) {
            routeChange('/login');
        }
    });

    return (
        <Fragment>
            <Button variant='contained' className='primary button' onClick={logout}>Logout</Button>
        </Fragment>
    );
};

export default connect(null, { logout })(Logout);