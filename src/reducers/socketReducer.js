import { types } from "../types/types";

const initState = {
    socket: null
}

const socketReducer = ( state=initState, action ) => {

    switch (action.type) {
        case types.socket:
            return{
                socket: action.payload
            }
    
        default:
            return state;
    }
    
}

export default socketReducer
