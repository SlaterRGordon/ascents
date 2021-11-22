import * as actionType from '../types/types';

const gradeReducer = (state = { isLoading: true, grades: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case actionType.FETCH_GRADES:
            return {
                ...state,
                grades: [action.payload.data],
            };
        case actionType.CLEAR_GRADES:
            return {
                ...state,
                grades: [],
            };
        case actionType.FETCH_GRADE:
            return { ...state, grade: action.payload.grade };
        case actionType.CREATE_GRADE:
            return { ...state, grades: [...state.grades, action.payload] };
        case actionType.DELETE_GRADE:
            return { ...state, grades: state.grades.filter((grade) => grade._id !== action.payload) };
        default:
            return state;
    }
};

export default gradeReducer;