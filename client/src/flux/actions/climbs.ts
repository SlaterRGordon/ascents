import * as actionType from '../types/types';
import * as api from '../api';

export const getClimb = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        console.log('getclimb');
        const { data } = await api.fetchClimb(id);

        dispatch({ type: actionType.FETCH_CLIMB, payload: { post: data } });
    } catch (error) {
        console.log(error);
    }
};

export const getClimbs = (page) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchClimbs(page);

        dispatch({ type: actionType.FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: actionType.END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createClimb = (post) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.createClimb(post);

        dispatch({ type: actionType.CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteClimb = (id) => async (dispatch) => {
    try {
        await await api.deleteClimb(id);
        dispatch({ type: actionType.DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};