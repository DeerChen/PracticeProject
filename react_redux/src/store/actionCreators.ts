import { VALUECHANGE, SUBMIT, DEL } from './actionTypes';

export const valChange = (e: { target: { value: any; }; }) => ({
    type: VALUECHANGE,
    value: e.target.value
});

export const sub = () => ({
    type: SUBMIT
});

export const del = (index: any) => ({
    type: DEL,
    index
});