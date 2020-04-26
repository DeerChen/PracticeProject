import { INIT, DEL, CHANGE, SUBMIT } from "./actionTypes"
import axios from "axios"

const init = (data: any) => ({
    type: INIT,
    data
})

export const getData = () => {
    return (dispatch: any) => {
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