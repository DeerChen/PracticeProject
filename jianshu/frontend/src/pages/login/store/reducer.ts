import { LOGIN, LOGOUT } from "./actionTypes";
import { fromJS } from "immutable";


const defaultState = fromJS({
    login: false
});

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return state.set('login', action.value);
        case LOGOUT:
            return state.set('login', action.value);
        default:
            return state;
    }
};