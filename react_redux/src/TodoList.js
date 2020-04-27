import React from 'react';
import { connect } from 'react-redux';
import { valChange, sub, del } from './store/actionCreators';
import './TodoList.less';

const TodoList = (props) => {
    const { inputVal, valueChange, submit, list, delItem } = props;
    return (
        <div>
            <div>
                <input
                    value={inputVal}
                    onChange={valueChange}
                />
                <button
                    onClick={submit}
                >提交</button>
            </div>
            <ul>
                {
                    list.map((item, index)=>{
                        return (
                            <li
                                key={index}
                                onClick={() => delItem(index)}
                            >
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (store) => {
    return {
        inputVal: store.inputVal,
        list: store.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        valueChange(e) {
            const action = valChange(e);
            dispatch(action);
        },
        submit(){
            const action = sub();
            dispatch(action);
        },
        delItem(index){
            const action = del(index);
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);