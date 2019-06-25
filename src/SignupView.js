import React from "react";

// import "./SignupView.css"

class SignupView extends React.Component {
    render() {
        return (
            <div id={"signup-view"}>
                <h1>Sign up View</h1>
                <form>
                    <label>USERNAME<input type={"text"}/></label>
                    <label>PASSWORD<input type={"password"}/></label>
                    <label>CONFIRM PASSWORD<input type={"password"}/></label>
                    <button type={"submit"}>Sign up</button>
                </form>
            </div>
        );
    }
}

export default SignupView;