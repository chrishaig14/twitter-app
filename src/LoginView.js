import React from "react";
import {Link, Redirect} from "react-router-dom";

// import "./LoginView.css";

class LoginView extends React.Component {

    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {username: "", password: "", toFeed: false, error: false};
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
        fetch(this.serverUrl + "/login", {
            method: "POST",
            body: JSON.stringify(
                {
                    username: this.state.username, password: this.state.password
                }
            )
        }).then(
            (res) => {
                if (!res.ok) {
                    this.setState({error: "There was an error!"});
                } else {
                    this.setState({toFeed: true});
                }
            }
        ).catch(
            () => this.setState({error: "Could not process request!"})
        );
        event.preventDefault();
    }

    render() {
        if (this.state.toFeed) {
            return (<Redirect to={"/feed"}/>);
        }
        return (
            <div id={"login-view"}>
                <h1>Login View</h1>
                <form onSubmit={this.submitLogin}>
                    <label>USERNAME<input type="text" value={this.state.username}
                                          onChange={this.onUsernameChange}/></label>
                    <label>PASSWORD<input type="password" value={this.state.password} onChange={this.onPasswordChange}/></label>
                    {(this.state.error ? <span style={{color: "red"}}>{this.state.error}</span> : null)}
                    <div className={"login-buttons"}>
                        <button type="submit">Login</button>
                        <Link to={"/signup"} className="button-link">Sign up</Link>
                    </div>
                </form>
            </div>
        );
    }

}

export default LoginView;