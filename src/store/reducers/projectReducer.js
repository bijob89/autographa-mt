import { SET_PROJECTS } from '../actions/actionConstants';

const initialState = {
    projects: []
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case SET_PROJECTS:
            return {
                ...state,
                projects: action.projects
            };
        default:
            return {
                ...state
            };
    };
}

export default reducer;