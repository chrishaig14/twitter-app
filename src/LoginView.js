import React from "react";

// import "./LoginView.css";

class LoginView extends React.Component {
    render() {
        return (
            <div id={"login-view"}>
                <h1>Login View</h1>
                <form>
                    <label>USERNAME<input type="text"/></label>
                    <label>PASSWORD<input type="password"/></label>
                    <div className={"login-buttons"}>
                        <button type="submit">Login</button>
                        <a href="#" className="button-link">Sign up</a>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginView;