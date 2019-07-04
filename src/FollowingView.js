import React from "react";
import FollowedUser from "./FollowedUser";

class FollowingView extends React.Component {
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
        this.state = {users: []};
        this.token = this.str_obj(document.cookie).token;
        this.onUnfollow = this.onUnfollow.bind(this);
    }

    onUnfollow(id) {
        console.log("UNFOLLOWING USER: ", id);
        this.setState(prevState => {
                console.log(prevState);
                return {users: prevState.users.filter(el => el != id)};
            },
            () => {
                console.log("NEW STATE: ", this.state);
            }
        );
    }

    componentDidMount() {
        fetch(this.serverUrl + "/users/me/followees", {
            method: "GET",
            headers: {"Authorization": this.token}
        }).then(
            res => res.json()
        ).then(
            res => {
                this.setState({users: res.map(x => x.followee)});
            }
        );
    }

    render() {
        return (
            <div>
                <h2>Following {this.state.users.length} users</h2>
                {this.state.users.map(username => <FollowedUser key={username} onUnfollow={this.onUnfollow}
                                                                username={username}/>)}
            </div>
        );
    }
}

export default FollowingView;