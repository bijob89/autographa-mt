import { SET_USERS, SET_IS_FETCHING } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';
import swal from 'sweetalert';

const accessToken = localStorage.getItem('accessToken');

export const fetchUsers = () => async dispatch => {
    try{
        dispatch(setIsFetching(true))  
        const data = await fetch(apiUrl + 'v1/autographamt/users', {
            method:'GET',
            headers: {
                "Authorization": 'bearer ' + accessToken
            }
        })
        const userData = await data.json();
        dispatch(setUsers(userData));
    }
    catch(e) {
        swal({
            title: 'Users',
            text: 'Unable to fetch users, check your internet connection or contact admin',
            icon: 'error'
        })
    }
    dispatch(setIsFetching(false))
};

export const updateAdminStatus = (data) => async dispatch => {
    try{
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
            swal({
                title: 'User status',
                text: 'User status has been updated successfully',
                icon: 'success'
            })
        } else {
            swal({
                title: 'User status',
                text: 'User status could not be updated. Please try later',
                icon: 'error'
            })
        }
    }
    catch(e) {
        swal({
            title: 'Users',
            text: 'Unable to update users, check your internet connection or contact admin',
            icon: 'error'
        })
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