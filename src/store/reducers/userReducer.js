import { SET_USERS, SET_IS_FETCHING } from '../actions/actionConstants';

const initialState = {
    users: [],
    isFetching: false
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case SET_USERS:
            return {
                ...state,
                users: action.users
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