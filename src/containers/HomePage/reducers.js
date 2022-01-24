import { ActionTypes } from "./constants";

const defaultState = {
 users:[]
};

export default function homePage(state = defaultState,action){
    switch(action.type){
        case ActionTypes.SET_USERS:
            return {...state,users:action.payload};
        default:
            return state;
    }
}