import { SET_BIBLE_LANGUAGES, SET_IS_FETCHING, SET_ALL_LANGUAGES } from './actionConstants';
import apiUrl from '../../components/GlobalUrl.js';
import swal from 'sweetalert';

export const fetchBibleLanguages = () => async dispatch => {
    try{
        
        // const data = await fetch(apiUrl + 'v1/bibles/languages', {
        //     method: 'GET'
        // })
        
        // const bibleLanguages = await data.json()

        
        const lang = await fetch(apiUrl + 'v1/bibles', {
            method: 'GET'
        })
        const biblesDetails = await lang.json()

        

        
        dispatch(setBibleLanguages(biblesDetails))
    }
    catch(e) {
        swal({
            title: 'Fetch Bible languages',
            text: 'Unable to fetch bible language data, check your internet connection or contact admin',
            icon: 'error'
        })

    }
}

export const fetchAllLanguages = () => async dispatch => {
    try{
        const data = await fetch(apiUrl + 'v1/languages', {
            method: 'GET'
        })
        const allLanguages = await data.json()
        dispatch(setAllLanguages(allLanguages))
    }
    catch(e){
        swal({
            title: 'Fetch all languages',
            text: 'Unable to fetch all language data, check your internet connection or contact admin',
            icon: 'error'
        })

    }
}

export const setBibleLanguages = bibleLanguages => ({
    type: SET_BIBLE_LANGUAGES,
    bibleLanguages
});

export const setAllLanguages = allLanguages => ({
    type: SET_ALL_LANGUAGES,
    allLanguages
})

export const setIsFetching = status => ({
    type: SET_IS_FETCHING,
    status
})

export const createSource = (source) => {
    return (dispatch, getState) => {
        dispatch({ type: 'GET_SOURCES', source })
    }
};

export const selectProject = (project) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SELECT_PROJECT', project })
    }
}

export const selectedBooks = (selection) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SELECTED_BOOKS', selection })
    }
}

export const selectToken = (token) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SELECT_TOKEN', token })
    }
}

export const selectBook = (project) => {
    return (dispatch, getState) => {
        dispatch({type:"SELECT_BOOK", project})
    }
}

export const saveToken = (token) => {
    return (dispatch, getState) => {
        dispatch({ type: 'GET_TOKEN', token })
    }
}

export const displaySnackBar = (popUp) => {
    return (dispatch, getState) => {
        dispatch({ type: 'DISPLAY_POP_UP', popUp})
    }
}

export const saveReference = (reference) => {
    return (dispatch, getState) => {
        dispatch({type: 'SAVE_REFERENCE', reference})
    }
}