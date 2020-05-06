import { fromJS } from "immutable";
import { INITDETAIL } from "./actionTypes";

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
        case INITDETAIL:
            return init(state, action);
        default:
            return state;
    }
}