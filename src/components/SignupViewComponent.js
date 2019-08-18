import React from "react";

class SignupViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
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

    render() {
        return (
            <div id={"signup-view"}>
                <h1>Sign up View</h1>
                <form onSubmit={(e) => {
                    this.props.signup(this.state);
                    e.preventDefault();
                }}>
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

export default SignupViewComponent;
