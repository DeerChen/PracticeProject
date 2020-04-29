import { VALUECHANGE, SUBMIT, DEL } from './actionTypes';

interface State {
    inputVal: string;
    list: string[];
}

const defaultState: State = {
    inputVal: '',
    list: ['吃饭', '睡觉', '打豆豆']
}

const copyState = (state: State) => {
    return JSON.parse(JSON.stringify(state));
}

export default (state = defaultState, action: any) => {
    if (action.type === VALUECHANGE) {
        const newState = copyState(state);
        newState.inputVal = action.value;
        return newState;
    }
    if (action.type === SUBMIT) {
        const newState = copyState(state);
        newState.list.push(newState.inputVal);
        newState.inputVal = '';
        return newState;
    }
    if (action.type === DEL) {
        const newState = copyState(state);
        newState.list.splice(action.index, 1);
        return newState;
    }
    return state;
}