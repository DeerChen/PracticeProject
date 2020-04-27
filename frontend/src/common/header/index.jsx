import React, { Component } from 'react';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Btn,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style';
import { IconFontGlobalStyle } from '../../statics/iconfont/iconfont';
import { GlobalStyle } from '../../style';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store';

class Header extends Component {
    componentDidMount() {
        this.props.init();
    }

    render() {
        const { focused, t } = this.props;
        return (
            <HeaderWrapper>
                <GlobalStyle />
                <Logo />
                <Nav>
                    <IconFontGlobalStyle />
                    <NavItem className='left'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames='slide'
                        >
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={t}
                                onBlur={t}
                            />
                        </CSSTransition>
                        <span className={focused ? 'focused iconfont' : 'iconfont'}>&#xe819;</span>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Btn className='writting'>
                        <span className="iconfont">&#xe60e;</span>
                                写文章
                                </Btn>
                    <Btn className='reg'>注册</Btn>
                </Addition>
            </HeaderWrapper>
        )
    }

    getListArea() {
        const { focused, list, page, mouseT, mouseToggle, changePage, totalPage } = this.props;
        const jsList = list.toJS();
        const pageList = [];

        if (jsList.length) {
            for (let i = (page - 1) * 10; i < page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={i}>
                        {jsList[i]}
                    </SearchInfoItem>
                );
            }
        }

        if (focused || mouseToggle) {
            return (
                <SearchInfo
                    onMouseEnter={mouseT}
                    onMouseLeave={mouseT}
                >
                    <SearchInfoTitle>
                        热门搜索
                                <SearchInfoSwitch
                            onClick={() => changePage(page, totalPage)}
                        >换一批
                                </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        focused: state.get('header').get('focused'),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseToggle: state.getIn(['header', 'mouseToggle']),
        totalPage: state.getIn(['header', 'totalPage'])
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        init() {
            dispatch(actionCreators.getList());
        },

        t() {
            dispatch(actionCreators.toggle());
        },
        mouseT() {
            dispatch(actionCreators.mouseTo());
        },
        changePage(page, totalPage) {
            if (page < totalPage) {
                dispatch(actionCreators.changeP(page + 1));
            }
            dispatch(actionCreators.changeP(1));
        }
    }

}

export default connect(mapStateToProps, mapDispathToProps)(Header);