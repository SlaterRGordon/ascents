import * as actionType from '../types/types';
import * as api from '../api';

export const login = (formData) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);

        dispatch({ type: actionType.LOGIN_SUCCESS, data });
    } catch (error) {
        dispatch({
            type: actionType.LOGIN_FAIL
        });
    }
};

export const register = (formData) => async (dispatch) => {
    try {
        const { data } = await api.register(formData);

        dispatch({ type: actionType.REGISTER_SUCCESS, data });
    } catch (error) {
        dispatch({
            type: actionType.REGISTER_FAIL
        });
    }
};

export const loginGoogle = (googleData) => async (dispatch) => {
    try {
        const { data } = await api.loginGoogle(googleData);

        dispatch({ type: actionType.LOGIN_SUCCESS, data });
    } catch (error) {
        dispatch({
            type: actionType.LOGIN_FAIL
        });
    }
};