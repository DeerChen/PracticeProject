import { fromJS } from 'immutable';
import { INIT, ADDHOMELIST, SCROLLTOPCHANGE } from './actionTypes';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    writerList: [],
    articlePage: 1,
    showScroll: false
});

const init = (state: any, action: any) => {
    return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList),
        writerList: fromJS(action.writerList)
    })
};

const addHomeList = (state: any, action: any) => {
    return state.merge({
        'articleList': state.get('articleList').concat(action.list),
        'articlePage': action.nextPage
    })
};

export default (state = defaultState, action: any) => {
    switch (action.type) {
        case INIT:
            return init(state, action);
        case ADDHOMELIST:
            return addHomeList(state, action);
        case SCROLLTOPCHANGE:
            return state.set('showScroll', action.swi);
        default:
            return state;
    }
}