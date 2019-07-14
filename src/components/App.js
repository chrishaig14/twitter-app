import React from "react";
import "../App.css";
import {Route, Switch} from "react-router-dom";
import UserViewContainer from "../containers/UserViewContainer";
import FeedViewContainer from "../containers/FeedViewContainer";
import LoginViewContainer from "../containers/LoginViewContainer";


class App extends React.Component {
    render() {
        return (
            <div>
                {/*<Switch>*/}
                {/*    <Route exact path={"/"} component={LoginViewContainer}/>*/}
                {/*    /!*<Route path={"/signup"} component={SignupView}/>*!/*/}
                {/*    /!*<Route component={Header}/>*!/*/}
                {/*</Switch>*/}

                {/*<Route path={"/feed"} component={FeedViewContainer}/>*/}
                <Route path={"/users/:id"} component={UserViewContainer}/>
                {/*<Route path={"/search"} component={SearchResultsView}/>*/}
                {/*<Route path={"/editProfile"} component={EditProfile}/>*/}
                {/*<Route path={"/following"} component={FollowingView}/>*/}

            </div>
        );
    }
}

export default App;
