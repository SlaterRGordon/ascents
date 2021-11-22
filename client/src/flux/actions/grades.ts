import * as actionType from '../types/types';
import * as api from '../api';

export const getGrade = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.fetchGrade(id);

        dispatch({ type: actionType.FETCH_GRADES, payload: { post: data } });
    } catch (error) {
        console.log(error);
    }
};

export const getGrades = () => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.fetchGrades();

        dispatch({ type: actionType.FETCH_GRADES, payload: data });
        dispatch({ type: actionType.END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const clearGrades = () => async (dispatch) => {
    try {
        dispatch({ type: actionType.CLEAR_GRADES });
    } catch (error) {
        console.log(error);
    }
};

export const createGrade = (grade) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING });
        const { data } = await api.createGrade(grade);

        dispatch({ type: actionType.CREATE_GRADE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteGrade = (id) => async (dispatch) => {
    try {
        await await api.deleteGrade(id);
        dispatch({ type: actionType.DELETE_GRADE, payload: id });
    } catch (error) {
        console.log(error);
    }
};