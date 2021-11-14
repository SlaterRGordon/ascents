import BaseLayout from '../../components/baseLayout';
import { useEffect } from 'react';
import { IAuthReduxProps } from '../../types/interfaces';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

const HomePage = ({
    auth,
    error, 
}: IAuthReduxProps) => {
    const navigate = useNavigate(); 

    const routeChange = (path: string) => {
        navigate(path);
    }

    useEffect(() => {
            console.log(auth);
            if(!auth.isAuthenticated) {
                routeChange('/login');
            }
    }, [error, auth]);

    var component = <div>TEST</div>;

	return (
		<BaseLayout component={component} />
	);
};

const mapStateToProps = (state: IAuthReduxProps) => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps)(
    HomePage
);