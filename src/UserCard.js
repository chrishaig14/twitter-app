import React from "react";
import {NavLink} from "react-router-dom";

class UserCard extends React.Component {
    serverUrl = "http://localhost:8888";

    str_obj(str) {
        str = str.split("; ");
        const result = {};
        for (let i = 0; i < str.length; i++) {
            const cur = str[i].split("=");
            result[cur[0]] = cur[1];
        }
        return result;
    }

    constructor(props) {
        super(props);
        this.state = {pic: "", followed: false};
        this.token = this.str_obj(document.cookie).token;
        this.unfollow = this.unfollow.bind(this);
        this.follow = this.follow.bind(this);
        console.log("MY USERNAME IS: ", this.props.username);
    }


    componentDidMount() {
        fetch(this.serverUrl + "/users/" + this.props.username + "/img",
            {method: "GET"}
        ).then(res => res.text()
        ).then(res => {
            this.setState({pic: res});
        });
        fetch(this.serverUrl + "/users/me/followees/" + this.props.username, {
            method: "GET", headers: {"Authorization": this.token}
        }).then(
            res => {
                console.log("RES.STATUS: ", res.status);
                if (res.status === 200) {
                    this.setState({followed: true});
                } else {
                    this.setState({followed: false});
                }
            }
        );
    }


    follow() {
        fetch(this.serverUrl + "/users/me/followees/" + this.props.username, {
            method: "PUT", headers: {"Authorization": this.token}
        }).then(
            res => {
                if (res.ok) {
                    console.log("NOW FOLLOWING USER: ", this.props.username);
                    this.setState({followed: true});
                }
            }
        );
    }

    unfollow() {
        fetch(this.serverUrl + "/users/me/followees/" + this.props.username, {
            method: "DELETE", headers: {"Authorization": this.token}
        }).then(
            res => {
                if (res.ok) {
                    console.log("STOPPED FOLLOWING USER: ", this.props.username);
                    this.setState({followed: false});
                }
            }
        );
    }

    render() {
        return (
            <div className={"followed-user"}>
                <img className={"followed-user-pic"} src={this.state.pic}/>
                <NavLink to={"/users/" + this.props.username}>{this.props.username}</NavLink>
                {this.state.followed ?
                    (<button onClick={this.unfollow}>Unfollow</button>) :
                    (<button onClick={this.follow}>Follow</button>)
                }
            </div>

        );
    }
}

export default UserCard;