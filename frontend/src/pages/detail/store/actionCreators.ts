import Axios from "axios";
import { INITDETAIL } from "./actionTypes";

const init = (data: any) => ({
    type: INITDETAIL,
    title: data.title,
    content: data.content
});

export const getData = (id: number) => {
    return (dispatch: any) => {
        Axios.get('/api/detail.json?id=' + id)
            .then((res) => {
                const data = res.data.data;
                const action = init(data);
                dispatch(action);
            })
    }
};