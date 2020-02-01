import { SET_ORGANISATIONS, SET_IS_FETCHING } from '../actions/actionConstants';

const initialState = {
    organisations: [],
    isFetching: false
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case SET_ORGANISATIONS:
            return {
                ...state,
                organisations: action.organisations
            };
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status
            }
        default:
            return {
                ...state
            };
    };
}

export default reducer;