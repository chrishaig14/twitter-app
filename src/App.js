import React from "react";
import "./App.css";
import LoginView from "./LoginView";
import SignupView from "./SignupView";
import Post from "./Post";
import Comment from "./Comment";
import NewPost from "./NewPost";
import {Route, Router, Switch} from "react-router-dom";
import FeedView from "./FeedView";
import UserView from "./UserView";
import EditProfile from "./EditProfile";
import FollowingView from "./FollowingView";
import Header from "./Header";


class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={"/"} component={LoginView}/>
                    <Route path={"/signup"} component={SignupView}/>
                    <Route component={Header}/>
                </Switch>

                {/*<Route path={"/post"} component={Post}/>*/}
                {/*<Route path={"/comment"} component={Comment}/>*/}
                {/*<Route path={"/newpost"} component={NewPost}/>*/}

                <Route path={"/feed"} component={FeedView}/>
                <Route path={"/users/:id"} component={UserView}/>
                <Route path={"/editProfile"} component={EditProfile}/>
                <Route path={"/following"} component={FollowingView}/>

                {/*<LoginView/>*/}
                {/*<SignupView/>*/}
                {/*<Post/>*/}
                {/*<Comment/>*/}
                {/*<NewPost/>*/}
            </div>
        );
    }
}

export default App;
