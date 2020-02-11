import { SET_USERS, SET_IS_FETCHING, SET_ASSIGNED_USERS, SET_USER_BOOKS } from '../actions/actionConstants';

const initialState = {
    users: [],
    isFetching: false,
    assignedUsers: [],
    userBooks: []
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
            case SET_ASSIGNED_USERS:
                return {
                    ...state,
                    assignedUsers: action.users
                }
            case SET_IS_FETCHING:
                return {
                    ...state,
                    isFetching: action.status
                }
            case SET_USER_BOOKS:
                return {
                    ...state,
                    userBooks: action.books
                }
        default:
            return {
                ...state
            };
    };
}

export default reducer;