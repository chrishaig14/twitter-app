import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {Redirect, Route, Switch} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {routerMiddleware, ConnectedRouter} from "connected-react-router";
import LoginViewContainer from "./containers/LoginViewContainer";
import FeedViewContainer from "./containers/FeedViewContainer";
import UserViewContainer from "./containers/UserViewContainer";
import HeaderContainer from "./containers/HeaderContainer";
import SearchResultsViewContainer from "./containers/SearchResultsViewContainer";
import FollowingViewContainer from "./containers/FollowingViewContainer";
import SignupViewContainer from "./containers/SignupViewContainer";

import Cookies from "js-cookie";
import ModalContainer from "./containers/ModalContainer";
import EditProfileContainer from "./containers/EditProfileContainer";

const history = createBrowserHistory();

let initialState = {
    main: {
        token: Cookies.get("token"),
        currentUser: {pic: "", info: ""},
        newCommentOk: false,
        userImages: {},
        posts: {},
        searchResults: [],
        following: [],
        userFollowed: {}
    }
};
// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(createRootReducer(history), initialState, compose(applyMiddleware(routerMiddleware(history), thunk)));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            {Cookies.get("token") ? <Redirect to={"/feed"}/> : null}

            <Switch>
                <Route exact path={"/"} component={LoginViewContainer}/>
                <Route path={"/signup"} component={SignupViewContainer}/>
                <Route component={HeaderContainer}/>
            </Switch>
            <ModalContainer/>
            <Route path={"/feed"} component={FeedViewContainer}/>
            <Route path={"/editProfile"} component={EditProfileContainer}/>
            <Route path={"/following"} component={FollowingViewContainer}/>
            <Route path={"/users/:id"} component={UserViewContainer}/>
            <Route path={"/search"} component={SearchResultsViewContainer}/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
