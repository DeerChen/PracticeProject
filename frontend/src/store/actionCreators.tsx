import { INIT, DEL, CHANGE, SUBMIT, SAGAINIT, GETSAGADATA } from "./actionTypes"
import axios from "axios"

export const initSaga = () => ({
    type: SAGAINIT
})

export const getSagaData = (res: { data: { data: any } }) => ({
    type: GETSAGADATA,
    data: res.data.data
})

const init = (data: any) => ({
    type: INIT,
    data
})

export const getData = () => {
    return (dispatch: (arg0: { type: string; data: any }) => void) => {
        axios.get('/api')
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