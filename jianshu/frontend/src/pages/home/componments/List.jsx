import React, { PureComponent, Fragment } from "react";
import { ListItem, ListInfo, LoadMore } from "../style";
import { connect } from 'react-redux';
import { getList } from '../store/actionCreators';
import { Link } from 'react-router-dom';

class List extends PureComponent {
    render() {
        const { list, getMoreList, page } = this.props;
        return (
            <Fragment>
                {
                    list.map((item, index) => (
                        <Link
                            key={index}
                            to={'/detail/' + item.get('id')}
                        >
                            <ListItem>
                                <img
                                    className='list-img'
                                    src={item.get('imgUrl')}
                                    alt={'list' + item.get('id')}
                                />
                                <ListInfo>
                                    <h3
                                        className='title'
                                    >
                                        {item.get('title')}
                                    </h3>
                                    <p
                                        className='desc'
                                    >
                                        {item.get('paragraph')}
                                    </p>
                                </ListInfo>
                            </ListItem>
                        </Link>
                    ))
                }
                <LoadMore
                    onClick={() => getMoreList(page)}
                >
                    加载更多
                </LoadMore>
            </Fragment>
        )
    }
}

const mapState = (state) => {
    return {
        list: state.getIn(['home', 'articleList']),
        page: state.getIn(['home', 'articlePage'])
    }
};

const mapDispatch = (dispatch) => ({
    getMoreList(page) {
        dispatch(getList(page))
    }
})

export default connect(mapState, mapDispatch)(List);