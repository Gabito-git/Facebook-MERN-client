import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from 'sweetalert2';


export const startChecking = () => {

    return async( dispatch ) => {

        try {

            const resp = await fetchConToken( 'auth/renew' );
            const body = await resp.json();

            if( body.ok ){

                const { user, token } = body;

                localStorage.setItem( 'token', token );                

                dispatch( login( user ) );
            }

            dispatch( finishChecking() );
            
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,              
              })
            
        }

    }

}

export const startRegisterWithForm = (name, email, password) => {

    return async( dispatch ) =>{

        try {

            const resp = await fetchSinToken( { name, email, password }, 'auth/register' );
            const body = await resp.json();

            if ( body.ok ){
                const { user, token } = body;
                localStorage.setItem('token', token);
                dispatch( login( user ) ) 
            }else{
                throw new Error( body.msg )
            }
          
            
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,              
              })
            
        }        

    }

}

export const startLogin = ( email, password ) => {

    return async( dispatch ) => {

        try {

            const resp = await fetchSinToken({ email, password }, 'auth/');
            const body = await resp.json();

            if( body.ok ){
                const { user, token } = body;
                localStorage.setItem( 'token', token );
               dispatch( login( user ) )
            }else{
                throw new Error( body.msg );
            }    
            
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,              
              })
            
        }

    }

}

export const startGoogleSignIn = ( id_token ) =>{

    return async( dispatch ) => {

        try {

            const resp = await fetchSinToken({ id_token }, 'auth/google');
            const body = await resp.json();

            if( body.ok ){

                const { user, token } = body;
                localStorage.setItem( 'token', token );                
                dispatch( login( user ) );

            }else{
                throw new Error( body.msg );
            }
            
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,              
              })
        }       
     
    }

}

export const startLogout = () => {

    return ( dispatch ) => {

        localStorage.clear();

        dispatch( logout() );
    }

}


const login = ( user ) =>({

    type: types.authLogin,
    payload: { user }

})

const finishChecking = () => ({
    type: types.authFinishChecking
})

const logout = () => ({
    type: types.authLogout
})