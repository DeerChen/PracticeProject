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
import { Link } from 'react-router-dom';
import { actionCreators as loginCreators } from '../../pages/login/store';

class Header extends Component {
    componentDidMount() {
        this.props.init();
    }

    render() {
        const { focused, t, login, logout } = this.props;
        return (
            <HeaderWrapper>
                <GlobalStyle />
                <Link
                    to='/'
                >
                    <Logo />
                </Link>
                <Nav>
                    <IconFontGlobalStyle />
                    <NavItem className='left'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    {
                        login ?
                            <NavItem
                                className='right login'
                                onClick={logout}
                            >
                                退出
                            </NavItem> :
                            <Link
                                to='/login'
                            >
                                <NavItem
                                    className='right login'
                                >
                                    登录
                                </NavItem>
                            </Link>
                    }
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
                    <Link to='/write'>
                        <Btn className='writting'>
                            <span className="iconfont">&#xe60e;</span>
                                写文章
                                </Btn>
                        <Btn className='reg'>注册</Btn>

                    </Link>
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
                    <SearchInfoItem key={jsList[i] + page + [i]}>
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
                            onClick={() => changePage(page, totalPage, this.spin)}
                        >
                            <span
                                ref={(icon) => { this.spin = icon }}
                                className="iconfont"
                            >
                                &#xe65e;
                            </span>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        focused: state.get('header').get('focused'),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        mouseToggle: state.getIn(['header', 'mouseToggle']),
        totalPage: state.getIn(['header', 'totalPage']),
        login: state.getIn(['login', 'login'])
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
        changePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            } else {
                originAngle = 0;
            }

            spin.style.transform = `rotate(${originAngle + 360}deg)`;

            if (page < totalPage) {
                dispatch(actionCreators.changeP(page + 1));
            } else {
                dispatch(actionCreators.changeP(1));
            }
        },
        logout() {
            dispatch(loginCreators.logout());
        }
    }

}

export default connect(mapStateToProps, mapDispathToProps)(Header);