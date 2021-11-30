import * as actionType from '../types/types';

const ascentReducer = (state = { isLoading: true, ascents: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
		case actionType.FETCH_ASCENTS:
			return {
				...state,
				ascents: [...state.ascents.concat(action.payload.data)],
				hasMore: action.payload.hasMore
			};
		case actionType.CLEAR_ASCENTS:
			return {
				...state,
				ascents: [],
			};
        case actionType.CREATE_ASCENT:
            return { ...state, ascents: [...state.ascents, action.payload] };
        case actionType.DELETE_ASCENT:
            return { ...state, ascents: state.ascents.filter((ascent) => ascent._id !== action.payload) };
        default:
            return state;
    }
};

export default ascentReducer;