import React from "react";
import {functionTypeAnnotation} from "@babel/types";
import {NavLink} from "react-router-dom";

class FollowedUser extends React.Component {
    serverUrl = "http://localhost:8888";


    str_obj(str) {
        str = str.split("; ");
        var result = {};
        for (var i = 0; i < str.length; i++) {
            var cur = str[i].split("=");
            result[cur[0]] = cur[1];
        }
        return result;
    }

    constructor(props) {
        super(props);
        this.state = {pic: ""};
        this.token = this.str_obj(document.cookie).token;
        this.unfollow = this.unfollow.bind(this);
    }


    componentDidMount() {
        fetch(this.serverUrl + "/users/" + this.props.username + "/img",
            {method: "GET"}
        ).then(res => res.text()
        ).then(res => {
            this.setState({pic: res});
        });
    }


    unfollow() {
        fetch(this.serverUrl + "/users/me/followees/" + this.props.username, {
            method: "DELETE", headers: {"Authorization": this.token}
        }).then(
            res => {
                if (res.ok) {
                    console.log("STOPPED FOLLOWING USER: ", this.props.username);
                    // this.setState({followed: false});
                    this.props.onUnfollow(this.props.username);
                }
            }
        );
    }

    render() {
        return (
            <div className={"followed-user"}>
                <img className={"followed-user-pic"} src={this.state.pic}/>
                <NavLink to={"/users/" + this.props.username}>{this.props.username}</NavLink>
                <button onClick={this.unfollow}>Unfollow</button>
            </div>
        );
    }
}

export default FollowedUser;