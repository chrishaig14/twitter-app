import React from "react";

// import "./SignupView.css"

class SignupView extends React.Component {
    constructor(props) {
        super(props);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onSignup = this.onSignup.bind(this);
        this.state = {username: "", password: "", confirmPassword: "", signup: false};
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onConfirmPasswordChange(event) {
        this.setState({confirmPassword: event.target.value});
    }

    onSignup(event) {
        console.log(`Signing up username=${this.state.username} password=${this.state.password} confirmPassword=${this.state.confirmPassword}`);
        this.setState({signup: true});
    }

    render() {
        return (
            <div id={"signup-view"}>
                <h1>Sign up View</h1>
                <form onSubmit={this.onSignup}>
                    <label>USERNAME
                        <input type={"text"} value={this.state.username}
                               onChange={this.onUsernameChange}/>
                    </label>
                    <label>PASSWORD
                        <input type={"password"} value={this.state.password}
                               onChange={this.onPasswordChange}/>
                    </label>
                    <label>CONFIRM PASSWORD
                        <input type={"password"} value={this.state.confirmPassword}
                               onChange={this.onConfirmPasswordChange}/>
                    </label>
                    <button type={"submit"}>Sign up</button>
                </form>
            </div>
        );
    }
}

export default SignupView;