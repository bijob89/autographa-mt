import { SET_ORGANISATIONS } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';

const accessToken = localStorage.getItem('accessToken');

export const fetchOrganisations = () => async (dispatch) => {
    const data = await fetch(apiUrl + '/v1/autographamt/organisations', {
        method:'GET',
        headers: {
            "Authorization": 'bearer ' + accessToken
        }
    })
    const organisations = await data.json()
    dispatch(setOrganisations(organisations));
}

export const updateOrganisationVerifiedStatus = (data) => async dispatch => {
    const update = await fetch(apiUrl + 'v1/autographamt/approvals/organisations', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Authorization: 'bearer ' + accessToken
        }
    })
    const response = await update.json();
    console.log('response', response)
    if(response.success) {
        dispatch(fetchOrganisations());
    }
}


export const setOrganisations = (organisations) => ({
    type: SET_ORGANISATIONS,
    organisations
});