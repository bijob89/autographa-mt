import { SET_PROJECTS } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';

const accessToken = localStorage.getItem('accessToken');

export const fetchProjects = () => async (dispatch) => {
    const data = await fetch(apiUrl + '/v1/autographamt/projects', {
        method:'GET',
        headers: {
            "Authorization": 'bearer ' + accessToken
        }
    })
    const projectLists = await data.json()
    dispatch(setProjects(projectLists));
}


export const setProjects = (projects) => ({
    type: SET_PROJECTS,
    projects
});