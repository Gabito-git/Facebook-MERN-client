import { types } from "../types/types";

const initState = {
    posts: [],
    active: {
        image:{
            src: '',
            file: null,
            deleted: false
        },
        body: '',
        id: null
    }
}

const postReducer = (state=initState, action) => {

    switch (action.type) {
     
        case types.postGetPosts:
            return {
                ...state,
                posts: action.payload
            }

        case types.postActivePost:
            return {
                ...state,
                active: action.payload
            }

        case types.postCleanActivePost:
            return{
                ...state,
                active: initState.active
            }

        default:
            return state;
    }
    
}

export default postReducer
