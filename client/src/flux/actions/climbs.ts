import * as actionType from '../types/types';
import * as api from '../api';

export const getClimb = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.fetchClimb(id);

        dispatch({ type: actionType.FETCH_CLIMB, payload: { post: data } });
    } catch (error) {
        console.log(error);
    }
};

export const getClimbs = (query) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.fetchClimbs(query);

        dispatch({ type: actionType.FETCH_CLIMBS, payload: data });
        dispatch({ type: actionType.END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const clearClimbs = () => async (dispatch) => {
    try {
        dispatch({ type: actionType.CLEAR_CLIMBS });
    } catch (error) {
        console.log(error);
    }
};

export const createClimb = (climb) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.createClimb(climb);

        dispatch({ type: actionType.CREATE_CLIMB, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteClimb = (id) => async (dispatch) => {
    try {
        await await api.deleteClimb(id);
        dispatch({ type: actionType.DELETE_CLIMB, payload: id });
    } catch (error) {
        console.log(error);
    }
};