import * as actionType from '../types/types';
import * as api from '../api';

export const getAscents = (page) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchAscents(page);

        dispatch({ type: actionType.FETCH_ASCENTS, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: actionType.END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getAscentsByUser = (page, userId) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchAscents({page, userId});

        dispatch({ type: actionType.FETCH_ASCENTS, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: actionType.END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const createAscent = (ascent) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.createAscent(ascent);

        dispatch({ type: actionType.CREATE_ASCENT, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteAscent = (id) => async (dispatch) => {
    try {
        await await api.deleteAscent(id);
        dispatch({ type: actionType.DELETE_ASCENT, payload: id });
    } catch (error) {
        console.log(error);
    }
};