import React from "react";
import "../App.css";
import LoginView from "./LoginView";
import SignupView from "./SignupView";
import {Route, Switch} from "react-router-dom";
import FeedViewComponent from "./FeedViewComponent";
import UserView from "./UserView";
import EditProfile from "./EditProfile";
import FollowingView from "./FollowingView";
import Header from "./Header";
import SearchResultsView from "./SearchResultsView";
import FeedViewContainer from "../containers/FeedViewContainer";


class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={"/"} component={LoginView}/>
                    {/*<Route path={"/signup"} component={SignupView}/>*/}
                    {/*<Route component={Header}/>*/}
                </Switch>

                <Route path={"/feed"} component={FeedViewContainer}/>
                {/*<Route path={"/users/:id"} component={UserView}/>*/}
                {/*<Route path={"/search"} component={SearchResultsView}/>*/}
                {/*<Route path={"/editProfile"} component={EditProfile}/>*/}
                {/*<Route path={"/following"} component={FollowingView}/>*/}

            </div>
        );
    }
}

export default App;
