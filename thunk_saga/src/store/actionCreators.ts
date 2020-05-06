import { INIT, DEL, CHANGE, SUBMIT, SAGAINIT} from "./actionTypes"
import Axios from "axios"

export const initSaga = () => ({
    type: SAGAINIT
})

export const init = (data: any) => ({
    type: INIT,
    data
})

export const getData = () => {
    return (dispatch: (arg0: { type: string; data: any }) => void) => {
        Axios.get('/api')
            .then((res) => {
                const data = res.data.data;
                const action = init(data);
                dispatch(action);
            })
    }
}

export const change = (value: string) => {
    return {
        type: CHANGE,
        value
    }
}

export const submit = (value: string) => {
    return {
        type: SUBMIT,
        value
    }
}

export const del = (index: any) => {
    return {
        type: DEL,
        index
    }
}