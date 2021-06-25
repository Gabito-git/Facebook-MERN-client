
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { types } from "../types/types";


export const startSocketConnect = ( serverPath ) => {
    return ( dispatch ) => {

        try {
            const socket = io.connect( serverPath );   
            dispatch( socketConnect( socket ) )
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,              
            })
        }
        
    }
}

const socketConnect = ( socket ) => ({
    type: types.socket,
    payload: socket
})