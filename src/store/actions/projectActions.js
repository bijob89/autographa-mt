import { SET_PROJECTS, SET_IS_FETCHING } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';

const accessToken = localStorage.getItem('accessToken');

export const fetchProjects = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    const data = await fetch(apiUrl + '/v1/autographamt/projects', {
        method:'GET',
        headers: {
            "Authorization": 'bearer ' + accessToken
        }
    })
    const projectLists = await data.json()
    dispatch(setProjects(projectLists));
    dispatch(setIsFetching(false))
}


export const setProjects = (projects) => ({
    type: SET_PROJECTS,
    projects
});

export const setIsFetching = (status) => ({
    type: SET_IS_FETCHING,
    status
})