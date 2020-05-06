import { INIT, ADDHOMELIST, SCROLLTOPCHANGE } from "./actionTypes";
import Axios from 'axios';
import { fromJS } from "immutable";

const init = (data: any) => ({
    type: INIT,
    topicList: data.topicList,
    articleList: data.articleList,
    recommendList: data.recommendList,
    writerList: data.writerList
});

export const getData = () => {
    return (dispatch: any) => {
        Axios.get('/api/home.json')
            .then((res) => {
                const data = res.data.data;
                const action = init(data);
                dispatch(action);
            })
    }
};

const addHomeList = (list: any, nextPage: number) => ({
    type: ADDHOMELIST,
    list: fromJS(list),
    nextPage
});

export const getList = (page: number) => {
    return (dispatch: any) => {
        Axios.get('/api/homeList.json?page=' + page)
            .then((res) => {
                const result = res.data.data;
                const action = addHomeList(result, page + 1);
                dispatch(action);
            })
    }
};

export const scrollTopChange = (swi: boolean) => ({
    type: SCROLLTOPCHANGE,
    swi
});