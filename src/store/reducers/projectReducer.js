import { SET_PROJECTS, SET_IS_FETCHING, SET_USER_PROJECTS } from '../actions/actionConstants';

const initialState = {
    projects: [],
    isFetching: false,
    userProjects: []
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
            case SET_USER_PROJECTS:
                return {
                    ...state,
                    userProjects: action.projects
                }
        default:
            return {
                ...state
            };
    };
}

export default reducer;