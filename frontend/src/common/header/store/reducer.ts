import { TOGGLE, UPDATE, MOUSETOGGLE, CHANGEPAGE } from "./actionTypes";
import { fromJS } from 'immutable';

const defaultState = fromJS({
    focused: false,
    mouseToggle: false,
    list: [],
    page: 1,
    totalPage: 1
});

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case TOGGLE:
            return state.set('focused', !state.get('focused'));
        case UPDATE:
            return state.merge({
                list: action.list,
                totalPage: action.totalPage
            })
        case MOUSETOGGLE:
            return state.set('mouseToggle', !state.get('mouseToggle'));
        case CHANGEPAGE:
            return state.set('page', action.newPage);
        default:
            return state;
    }
}