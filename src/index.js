import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from "redux";
import {BrowserRouter,Route,Redirect,Switch} from "react-router-dom";
import thunk from "redux-thunk";
import Provider from "react-redux/es/components/Provider";
// import reducers from "./reducer"
import reducer from "./reducer"
import './config'
import Login from "./container/login/login";
import Register from "./container/register/register";
import Authroute from "./component/authroute/authroute";
import Interviewerinfo from "./container/interviewerinfo/interviewerinfo";
import Applicantinfo from "./container/applicantinfo/applicantinfo";
import Dashboard from "./container/dashboard/dashboard";
// import TabBarExample from './container/tabbartest/tabbartest'
import './index.css'
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const store = createStore(reducer, enhancer);
/*const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__?window.__REDUX_DEVTOOLS_EXTENSION__():()=>{}
))*/
//applicant,intervierwer,me,msg四个页面
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Authroute/>
                <Switch>
                    {/*<Route path='/tabbartest' component={TabBarExample}/>*/}
                    <Route path='/interviewerinfo' component={Interviewerinfo}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/applicantinfo' component={Applicantinfo}/>
                    <Route path='/register' component={Register}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
