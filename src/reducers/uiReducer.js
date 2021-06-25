import { types } from '../types/types';

const initState = {
    msgError: null,
    isLoading: false,
    modalStatus: false,
    userImage: null
};

const uiReducer = (state = initState, action) => {
    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload,
            };

        case types.uiRemoveError:
            return {
                ...state,
                msgError: null,
            };

        case types.uiSetuserImage:
            return{
                ...state,
                userImage: action.payload
            }

        case types.uiSetModalStatus:
            return{
                ...state,
                modalStatus: action.payload
            }

        case types.uiSetIsLoading:
            return{
                ...state,
                isLoading: action.payload
            }

        default:
            return state;
    }
};

export default uiReducer;
