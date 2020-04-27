import { INIT, DEL, CHANGE, SUBMIT, GETSAGADATA } from "./actionTypes";

interface State {
    inputVal: string;
    data: string[];
}

const defaultState: State = {
    inputVal: '',
    data: []
}

const copyState = (state: State) => {
    return JSON.parse(JSON.stringify(state));
}

export default (state = defaultState, action: any) => {
    if (action.type === INIT || action.type === GETSAGADATA) {
        const newState = copyState(state);
        for (let i in action.data) {
            newState.data.push(action.data[i]);
        }
        return newState;
    }
    if (action.type === CHANGE) {
        const newState = copyState(state);
        newState.inputVal = action.value;
        return newState;
    }
    if (action.type === SUBMIT) {
        const newState = copyState(state);
        newState.data.push(action.value);
        newState.inputVal = '';
        return newState;
    }
    if (action.type === DEL) {
        const newState = copyState(state);
        newState.data.splice(action.index, 1);
        return newState;
    }
    return state;
}