import * as actionType from '../types/types';

const climbReducer = (state = { isLoading: true, climbs: [], prevClimbs: null }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case actionType.FETCH_CLIMBS:
            if(state.prevClimbs === action.payload) {
                return {
                    ...state,
                    climbs: [...state.climbs],
                    prevClimbs: action.payload
                };
            }
            return {
                ...state,
                climbs: [...state.climbs.concat(action.payload.data)],
                prevClimbs: action.payload.data,
                hasMore: action.payload.hasMore
            };
        case actionType.FETCH_CLIMB:
            return { ...state, climb: action.payload.climb };
        case actionType.CREATE_CLIMB:
            return { ...state, climbs: [...state.climbs, action.payload] };
        case actionType.DELETE_CLIMB:
            return { ...state, climbs: state.climbs.filter((climb) => climb._id !== action.payload) };
        default:
            return state;
    }
};

export default climbReducer;