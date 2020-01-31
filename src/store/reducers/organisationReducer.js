import { SET_ORGANISATIONS } from '../actions/actionConstants';

const initialState = {
    organisations: []
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case SET_ORGANISATIONS:
            return {
                ...state,
                organisations: action.organisations
            };
        default:
            return {
                ...state
            };
    };
}

export default reducer;