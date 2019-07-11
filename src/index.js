import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {routerMiddleware, ConnectedRouter} from "connected-react-router";
import LoginViewContainer from "./containers/LoginViewContainer";
import FeedViewContainer from "./containers/FeedViewContainer";

const history = createBrowserHistory();

const store = createStore(createRootReducer(history), compose(applyMiddleware(routerMiddleware(history), thunk)));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {/*<BrowserRouter>*/}
                {/*<App/>*/}
                <Switch>
                    <Route exact path={"/"} component={LoginViewContainer}/>
                    {/*<Route path={"/signup"} component={SignupView}/>*/}
                    {/*<Route component={Header}/>*/}
                </Switch>

                <Route path={"/feed"} component={FeedViewContainer}/>
            {/*</BrowserRouter>*/}
        </ConnectedRouter>
    </Provider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
