import React, { Component } from 'react';
import Header from './common/header';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Header />
                    <Route
                        path='/'
                        exact
                        component={Home}
                    />
                    <Route
                        path='/detail/:id'
                        exact
                        component={Detail}
                    />
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;