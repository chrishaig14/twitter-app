import React from "react";
import {functionTypeAnnotation} from "@babel/types";
import {NavLink} from "react-router-dom";

class FollowedUser extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {pic: ""};
    }

    componentDidMount() {
        fetch(this.serverUrl + "/users/" + this.props.username + "/img",
            {method: "GET"}
        ).then(res => res.text()
        ).then(res => {
            this.setState({pic: res});
        });
    }


    render() {
        return (
            <div className={"followed-user"}>
                <img className={"followed-user-pic"} src={this.state.pic}/>
                <NavLink to={"/users/" + this.props.username}>{this.props.username}</NavLink>
            </div>
        );
    }
}

export default FollowedUser;