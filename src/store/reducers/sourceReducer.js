import { SET_BIBLE_LANGUAGES, SET_ALL_LANGUAGES, SET_IS_FETCHING } from '../actions/actionConstants';
const initState = {
    bibleLanguages: [],
    allLanguages: [],
    isFetching: false
}

const sourceReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_BIBLE_LANGUAGES:
            return {
                ...state,
                bibleLanguages: action.bibleLanguages
            }
        case SET_ALL_LANGUAGES:
            return {
                ...state,
                allLanguages: action.allLanguages
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.status
            }
        case 'GET_SOURCES':
            return {
                ...state,
                sourceId: action.source.sourceId,
                book: action.source.book,
                targetLanguage: action.source.targetLanguage,
                targetLanguageId: action.source.targetLanguageId
            }
        case 'SELECT_PROJECT':
            return {
                ...state,
                project: action.project.project
            }
        case 'SELECT_BOOK':
            return {
                ...state,
                book: action.project.book,
                token:null,
            }
        case 'SELECTED_BOOKS':
            return {
                ...state,
                selectedBooks: action.selection.selectedBooks
            }
        case 'SELECT_TOKEN':
            return {
                ...state,
                token: action.token.token,
                reference: null,
                verseNum: null
            }
        case 'GET_SOURCES_ERROR':
            return {
                ...state,
                sourceError: 'Source Fetch Failed'
            }
        case 'GET_TOKEN':
            return {
                ...state,
                token: action.token.token,
                reference: null,
                verseNum: null
            }
        case 'DISPLAY_POP_UP':
            return {
                ...state,
                snackBarMessage: action.popUp.snackBarMessage,
                snackBarOpen: action.popUp.snackBarOpen,
                snackBarVariant: action.popUp.snackBarVariant
            }
        case 'SAVE_REFERENCE':
            return {
                ...state,
                reference: action.reference.reference,
                verseNum: action.reference.verseNum
            }
        default:
            return state
    }
}

export default sourceReducer