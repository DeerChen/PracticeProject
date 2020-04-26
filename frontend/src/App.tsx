import React, { Component } from 'react';
import AppUI from './AppUI';
import { del, change, submit, getData } from './store/actionCreators';
import store from './store';

interface State {
    inputVal: string;
    data: string[];
}

class App extends Component<object, State> {
    constructor(props: object) {
        super(props)
        this.state = store.getState();
        this.dataChange = this.dataChange.bind(this);
        this.delItem = this.delItem.bind(this);
        this.sub = this.sub.bind(this);
        store.subscribe(this.dataChange);
    }
    componentDidMount() {
        const action = getData();
        store.dispatch(action);
    }
    render() {
        return (
            <AppUI
                inputVal={this.state.inputVal}
                inputChange={this.inputChange}
                data={this.state.data}
                sub={this.sub}
                delItem={this.delItem}
            />
        )
    }
    inputChange(value: string) {
        const action = change(value);
        store.dispatch(action);
    }
    dataChange() {
        this.setState(store.getState());
    }
    sub(value: string) {
        const action = submit(value);
        store.dispatch(action);
    }
    delItem(index: any) {
        const action = del(index);
        store.dispatch(action);
    }
}

export default App;