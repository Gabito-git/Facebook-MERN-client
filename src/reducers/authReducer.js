import { types } from "../types/types";

const initState = {
    user: null,
    checking: true
}

const authReducer = ( state=initState, action) => {
   
    switch (action.type) {
        
        case types.authLogin:
            return { 
                ...state,
                ...action.payload
             }

        case types.authLogout:
            return{
                ...initState,
                checking: false
            }

        case types.authFinishChecking:
            return{
                ...state,
                checking: false
            }
    
        default:
            return state;
    }

}

export default authReducer;
