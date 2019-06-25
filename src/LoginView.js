import React from "react";
import {Link} from "react-router-dom";

// import "./LoginView.css";

class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.submitLogin = this.submitLogin.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    submitLogin(event) {
        console.log(`Submitting login with username=${this.state.username} and password=${this.state.password}`);
    }

    render() {
        return (
            <div id={"login-view"}>
                <h1>Login View</h1>
                <form onSubmit={this.submitLogin}>
                    <label>USERNAME<input type="text" value={this.state.username}
                                          onChange={this.onUsernameChange}/></label>
                    <label>PASSWORD<input type="password" value={this.state.password} onChange={this.onPasswordChange}/></label>
                    <div className={"login-buttons"}>
                        <button type="submit">Login</button>
                        <Link to="/signup" className="button-link">Sign up</Link>
                    </div>
                </form>
            </div>
        );
    }

}

export default LoginView;