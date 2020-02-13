import { SET_PROJECTS, SET_IS_FETCHING, SET_USER_PROJECTS } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';
import swal from 'sweetalert';
import { setDisplayName } from 'recompose';

const accessToken = localStorage.getItem('accessToken');

export const fetchProjects = () => async (dispatch) => {
    dispatch(setIsFetching(true));
    try{
        const data = await fetch(apiUrl + 'v1/autographamt/projects', {
            method:'GET',
            headers: {
                "Authorization": 'bearer ' + accessToken
            }
        });
        const projectLists = await data.json();
        dispatch(setProjects(projectLists));
    }
    catch(e){
        swal({
            title: 'Projects',
            text: 'Unable to fetch projects, check your internet connection or contact admin',
            icon: 'error'
        });

    }
    dispatch(setIsFetching(false));
}

export const createProject = (apiData, close, clearState) => async dispatch => {
    dispatch(setIsFetching(true))
    try{
        const data = await fetch(apiUrl + '/v1/autographamt/organisations/projects', {
            method: 'POST',
            body: JSON.stringify(apiData),
            headers: {
                Authorization: 'bearer ' + accessToken
            }
        })
        const myJson = await data.json();
        if (myJson.success) {
            clearState()
            dispatch(fetchProjects());
            swal({
                title: 'Projects',
                text: 'Project created successfully',
                icon: 'success'
            }).then(msg => {
                close()
            })
            dispatch(setIsFetching(false));
        } else {
            swal({
                title: 'Projects',
                text: 'Unable to create projects, contact admin or try again later',
                icon: 'error'
            });
            dispatch(setIsFetching(false));
    
        }
    }
    catch (e) {
        swal({
            title: 'Projects',
            text: 'Unable to create projects, check your internet connection or contact admin',
            icon: 'error'
        });
        dispatch(setIsFetching(false));
    }
}

export const fetchUserProjects = () => async dispatch => {
    try {
        dispatch(setIsFetching(true))
        const data = await fetch(apiUrl + 'v1/autographamt/users/projects', {
            method: 'GET',
            headers: {
                Authorization: 'bearer ' + accessToken
            }
        })
        const response = await data.json()
        if ('success' in response) {
            swal({
                title: 'Fetch users projects',
                text: response.message,
                icon: 'error'
            });
        } else {
            // this.setState({ projects: response })
            dispatch(setUserProjects(response))
        }
        dispatch(setIsFetching(false))
    }
    catch (ex) {
        dispatch(setIsFetching(false))
        swal({
            title: 'Fetch users projects',
            text: 'Unable to fetch users projects, check your internet connection or contact admin',
            icon: 'error'
        });
    }
}

export const setUserProjects = projects => ({
    type: SET_USER_PROJECTS,
    projects
})

export const setProjects = (projects) => ({
    type: SET_PROJECTS,
    projects
});

export const setIsFetching = (status) => ({
    type: SET_IS_FETCHING,
    status
});