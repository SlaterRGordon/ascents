import * as actionType from '../types/types';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.LOGIN_SUCCESS || actionType.REGISTER_SUCCESS:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data, loading: false, errors: null };
        case actionType.LOGOUT_SUCCESS:
            localStorage.clear();

            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};

export default authReducer;