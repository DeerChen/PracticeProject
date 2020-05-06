import React, { PureComponent } from 'react';
import { GlobalStyle } from '../../style';
import { HomeWrapper, HomeLeft, HomeRight, BackTop } from './style';
import Topic from './componments/Topic';
import List from './componments/List';
import Recommend from './componments/Recommend';
import Writer from './componments/Writer';
import { connect } from 'react-redux';
import { getData, scrollTopChange } from './store/actionCreators';
import { withRouter } from 'react-router-dom';

class Home extends PureComponent {
    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', this.props.scrollTopToggle);
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.scrollTopChange);
    }

    render() {
        const { showScroll } = this.props;
        return (
            <HomeWrapper>
                <GlobalStyle />
                <HomeLeft>
                    <img
                        className='banner-img'
                        src='//pic.abcyun.co/image/5ea7dd7bd41bf.jpg' alt='banner-img'
                    />
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
                {showScroll ? <BackTop onClick={this.scrollTop}>回到顶部</BackTop> : ''}
            </HomeWrapper>
        )
    }
}

const mapState = (state) => ({
    showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
    changeHomeData() {
        const action = getData();
        dispatch(action);
    },
    scrollTopToggle() {
        if (document.documentElement.scrollTop > 100) {
            dispatch(scrollTopChange(true));
        } else {
            dispatch(scrollTopChange(false));
        }
    }
});

export default connect(mapState, mapDispatch)(withRouter(Home));