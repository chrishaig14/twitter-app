import React from "react";

class UserPic extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {userpic: ""};
    }


    componentDidMount() {
        let url = this.serverUrl + "/users/" + this.props.username + "/img";
        fetch(url, {
            method: "GET"
        }).then(
            res => {
                return res.text();
            }
        ).then(
            res => {
                this.setState({"userpic": res});
            }
        );
    }

    render() {
        return (
            <img src={this.state.userpic} className={"userpic"}/>
        );
    }
}

export default UserPic;