import React from "react";
import FollowedUser from "./FollowedUser";

class FollowingView extends React.Component {
    serverUrl = "http://localhost:8888"
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
        this.state = {users: []};
        this.token = this.str_obj(document.cookie).token;
    }

    componentDidMount() {
        fetch(this.serverUrl + "/users/me/followees", {
            method: "GET",
            headers: {"Authorization": this.token}
        }).then(
            res => res.json()
        ).then(
            res => {
                this.setState({users: res});
            }
        );
    }

    render() {
        return (
            <div>
                {this.state.users.map(username => <FollowedUser key={username.followee} username={username.followee}/>)}
            </div>
        );
    }
}

export default FollowingView;