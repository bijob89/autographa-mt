import { SET_PROJECTS, SET_IS_FETCHING } from '../actions/actionConstants';

const initialState = {
    projects: [],
    isFetching: false
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case SET_PROJECTS:
            return {
                ...state,
                projects: action.projects
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