import React from "react";
import {Link, Redirect} from "react-router-dom";

class LoginViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        // if (this.props.redirect) {
        //     return (<Redirect to={this.props.redirect}/>);
        // }
        return (
            <div id={"login-view"}>

                <form onSubmit={this.onSubmit}>
                    <label>USERNAME<input type="text" value={this.state.username}
                                          onChange={this.onUsernameChange}/></label>
                    <label>PASSWORD<input type="password" value={this.state.password} onChange={this.onPasswordChange}/></label>
                    {(this.props.error ? <span style={{color: "red"}}>{this.props.error}</span> : null)}
                    <div className={"login-buttons"}>
                        <button type="submit">Login</button>
                        <Link to={"/signup"} className="button-link">Sign up</Link>
                    </div>
                </form>
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    }
}

export default LoginViewComponent;