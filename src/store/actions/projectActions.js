import { SET_PROJECTS, SET_IS_FETCHING } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';
import swal from 'sweetalert';

const accessToken = localStorage.getItem('accessToken');

export const fetchProjects = () => async (dispatch) => {
    dispatch(setIsFetching(true))
    try{
        const data = await fetch(apiUrl + 'v1/autographamt/projects', {
            method:'GET',
            headers: {
                "Authorization": 'bearer ' + accessToken
            }
        })
        const projectLists = await data.json()
        dispatch(setProjects(projectLists));
    }
    catch(e){
        swal({
            title: 'Projects',
            text: 'Unable to fetch projects, check your internet connection or contact admin',
            icon: 'error'
        })

    }
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