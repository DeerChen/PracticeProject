import { TOGGLE, UPDATE, MOUSETOGGLE, CHANGEPAGE } from "./actionTypes";
import axios from 'axios';
import { fromJS } from 'immutable';

export const toggle = () => ({
    type: TOGGLE
})

const update = (data: string[]) => ({
    type: UPDATE,
    list: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
});

export const getList = () => {
    return (dispatch: any) => {
        axios.get('/api')
            .then((res) => {
                const data = res.data.data;
                const action = update(data);
                dispatch(action);
            })
            .catch((e) => {
                console.log(e);
            })
    }
};

export const mouseTo = () => ({
    type: MOUSETOGGLE
});

export const changeP = (newPage: number) => ({
    type: CHANGEPAGE,
    newPage
})