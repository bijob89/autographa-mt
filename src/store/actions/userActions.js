import { SET_USERS, SET_IS_FETCHING } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';

const accessToken = localStorage.getItem('accessToken');

export const fetchUsers = () => async dispatch => {  
    dispatch(setIsFetching(true))  
    const data = await fetch(apiUrl + '/v1/autographamt/users', {
        method:'GET',
        headers: {
            "Authorization": 'bearer ' + accessToken
        }
    })
    const userData = await data.json();
    dispatch(setUsers(userData));
    dispatch(setIsFetching(false))
};

export const updateAdminStatus = (data) => async dispatch => {
    dispatch(setIsFetching(true))
    const update = await fetch(apiUrl + 'v1/autographamt/approvals/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Authorization: 'bearer ' + accessToken
        }
    });
    const response = await update.json();
    if (response.success){
        dispatch(fetchUsers());
    }
    dispatch(setIsFetching(false))
};

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const setIsFetching = (status) => ({
    type: SET_IS_FETCHING,
    status
})