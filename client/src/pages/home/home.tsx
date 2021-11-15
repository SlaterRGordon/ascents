import BaseLayout from '../../components/baseLayout';
import { IAuthReduxProps } from '../../flux/types/interfaces';
import { connect } from 'react-redux';

const HomePage = ({
    auth,
    error, 
}: IAuthReduxProps) => {

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