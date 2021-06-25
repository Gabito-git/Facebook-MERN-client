import Swal from "sweetalert2";

import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types";
import {  changeIsLoadingStatus, changeModalStatus  } from "./ui";
import { startDeletingImagePost, startUploadingImage } from "./uploads";

export const startPost = ( id, body, file, deleted ) => {    

    return async( dispatch, getState ) => {

        dispatch( changeIsLoadingStatus( true ) );
        let resp;

        id ? resp = await fetchConToken(`post/${ id }`, { body }, 'PUT')
           : resp = await fetchConToken('post', {body}, 'POST')
        
        const data = await resp.json();
        console.log( data )

        if( data.ok ){            

            if( file ){
                dispatch( startUploadingImage( file, 'posts', data.postId ) );
            }else if( deleted ){
                dispatch( startDeletingImagePost( id ) );                   
            } else{
                const { socket:{ socket } } = getState();
    
                socket.emit('post-update')

                dispatch( changeModalStatus( false ) );
                dispatch( changeIsLoadingStatus( false ) );
            }           

        }   

    }

}

export const startGettingPosts = () => {

    return async( dispatch ) =>{

        try {
            const resp = await fetchConToken('post');
            const body = await resp.json();

            if( body.ok ){
                dispatch( loadPosts( body.posts ) );    
            }else{
                throw new Error (body.msg)
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

export const deletePost = ( id ) => {

    return async( dispatch, getState ) => {

        const { socket:{ socket } } = getState();

        try {

            const resp = await fetchConToken(`post/${ id }`, {}, 'DELETE');
            const data = await resp.json();

            if(!data.ok){
                throw new Error( data.msg )
            }

            socket.emit('post-update')
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,              
            })
        }        

    }

}



export const loadPosts = ( posts ) => ({
    type: types.postGetPosts,
    payload: posts
})

export const setActive = ( post ) => ({
    type: types.postActivePost,
    payload: post
})

export const cleanActive = () => ({
    type: types.postCleanActivePost
})