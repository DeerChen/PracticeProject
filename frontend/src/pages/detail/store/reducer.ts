import { INIT } from "../../home/store/actionTypes";
import { fromJS } from "immutable";

const defaultState = fromJS({
    title: '',
    content: ''
})

const init = (state: any, action: any) => (
    state.merge({
        title: fromJS(action.title),
        content: fromJS(action.content)
    })
);

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case INIT:
            return init(state, action);
        default:
            return state;
    }
}