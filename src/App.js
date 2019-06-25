import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginView from "./LoginView";
import SignupView from "./SignupView";
import Post from "./Post";
import Comment from "./Comment";
import NewPost from "./NewPost";

class App extends React.Component {
    render() {
        return (
            <div>
                <LoginView/>
                <SignupView/>
                <Post/>
                <Comment/>
                <NewPost/>
            </div>
        );
    }
}

export default App;
