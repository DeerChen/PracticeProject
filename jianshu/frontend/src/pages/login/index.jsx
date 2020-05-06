import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { LoginWrapper, LoginBox, Input, Button } from "./style";
import { logCheck } from './store/actionCreators';
import { Redirect, withRouter } from "react-router-dom";

class Login extends PureComponent {
    render() {
        const { login, loginFun } = this.props;
        if (!login) {
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input
                            ref={input => { this.userRef = input }}
                            placeholder='账号'
                        />
                        <Input
                            ref={input => { this.passwdRef = input }}
                            placeholder='密码'
                            type='password'
                        />
                        <Button
                            onClick={() => loginFun(this.userRef, this.passwdRef)}
                        >
                            登录
                        </Button>
                    </LoginBox>
                </LoginWrapper>
            )
        } else {
            return <Redirect to='/' />
        }

    }
}

const mapState = (state) => ({
    login: state.getIn(['login', 'login'])
});

const mapDispatch = (dispatch) => {
    return {
        loginFun(user, passwd) {
            const action = logCheck(user.value, passwd.value);
            return dispatch(action);
        }
    }
};

export default connect(mapState, mapDispatch)(withRouter(Login));