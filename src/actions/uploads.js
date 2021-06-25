import Swal from "sweetalert2";
import { fetchConToken, fetchImages } from "../helpers/fetch";
import { changeIsLoadingStatus, changeModalStatus, setUserImage } from "./ui";

// Id se refiere al id del usuario, en caso de ser una imagen de perfil, o del post, en caso de ser imagen de post

export const startUploadingImage = ( file, endpoint, id ) => {

    return async( dispatch, getState) => {

        try {

            const resp = await fetchImages( `uploads/${ endpoint }/${ id }`, file );
            const data = await resp.json();


            if( data.ok ){

                if( endpoint === 'users' ){
                    dispatch( setUserImage( data.image ) );
                }

                console.log(data);
    
                const { socket:{ socket } } = getState();
    
                socket.emit('post-update')
                
                dispatch( changeModalStatus( false ) );
            } else{
                dispatch( changeIsLoadingStatus( false ) );
                console.log(data.msg);
                throw new Error( data.msg );                
            }
            
            dispatch( changeIsLoadingStatus( false ) );
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,              
              })
        }      

    }

}

export const startDeletingImagePost = ( id ) => {

    return async(dispatch, getState) => {

        try {

            const resp = await fetchConToken( `uploads/${ id }`, {}, 'DELETE' );
            const data = await resp.json();

            if( !data.ok ){
                throw new Error( data.msg )
            }

            const { socket:{ socket } } = getState();
            
            socket.emit('post-update')
            dispatch( changeIsLoadingStatus( false ) );
            dispatch( changeModalStatus( false ) );
            
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,              
              })
            
        }     


    }

}
