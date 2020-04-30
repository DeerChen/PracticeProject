import { INIT } from "../../home/store/actionTypes";
import Axios from "axios";

const init = (data: any) => ({
    type: INIT,
    title: data.title,
    content: data.content
});

export const getData = () => {
    return (dispatch: any) => {
        Axios.get('/api/detail.json')
            .then((res) => {
                const data = res.data.data;
                const action = init(data);
                dispatch(action);
            })
    }
};