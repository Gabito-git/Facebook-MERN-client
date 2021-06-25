import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';


export const startGettingUserImage = () => {

    return async( dispatch ) => {
        const resp = await fetchConToken('user');
        const body = await resp.json();

        if( body.ok ){
            dispatch( setUserImage( body.profileImage ) );
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: body.msg,              
              })
        }

    }

}

export const setError = (msg) => ({
    type: types.uiSetError,
    payload: msg,
});

export const removeError = () => ({
    type: types.uiRemoveError,
});

export const setUserImage = ( url ) => ({
    type: types.uiSetuserImage,
    payload: url
})

export const changeModalStatus = ( status ) => ({
    type: types.uiSetModalStatus,
    payload: status
})

export const changeIsLoadingStatus = ( status ) =>({
    type: types.uiSetIsLoading,
    payload: status
})
