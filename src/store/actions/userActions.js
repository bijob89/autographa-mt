import { SET_USERS } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';

const accessToken = localStorage.getItem('accessToken');

export const fetchUsers = () => async dispatch => {    
    const data = await fetch(apiUrl + '/v1/autographamt/users', {
        method:'GET',
        headers: {
            "Authorization": 'bearer ' + accessToken
        }
    })
    const userData = await data.json();
    dispatch(setUsers(userData));
};

export const updateAdminStatus = (data) => async dispatch => {
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
};

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});