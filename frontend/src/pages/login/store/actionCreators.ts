import { LOGIN, LOGOUT } from "./actionTypes";
import Axios from "axios";

const changeLogin = () => ({
    type: LOGIN,
    value: true
});

export const logCheck = (user: string, passwd: string) => {
    return (dispatch: any) => {
        Axios.get('/api/login.json?account=' + user + '&passwd=' + passwd)
            .then((res) => {
                if (res) {
                    dispatch(changeLogin())
                } else {
                    alert('失败');
                }
            })
    }
};

export const logout = ()=>({
    type: LOGOUT,
    value: false
});