import React from "react";
import Post from "./Post";

class UserView extends React.Component {
    serverUrl = "http://localhost:8888";
    username = "";


    constructor(props) {
        super(props);
        console.log("username: ", this.props.match.params.id);
        this.username = this.props.match.params.id;
        this.token = this.props.location.state.token;
        console.log("my token is: ", this.token);
        this.state = {"posts": [], followed: false};
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }

    componentDidMount() {
        console.log("SENDING REQUEST TO GET USER POSTS");
        fetch(this.serverUrl + "/users/" + this.username + "/posts", {
            method: "GET"
        }).then(
            res => res.json()
        ).then(
            res => {
                console.log(`GOT USER ${this.username} POSTS:`, res);
                this.setState({"posts": res});
            }
        );
        this.checkFollowed();
    }

    checkFollowed() {
        fetch(this.serverUrl + "/users/me/followees/" + this.username, {
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
    }

    unfollow() {
    }

    render() {
        console.log("IS FOLLOWED: ", this.state.followed);
        return (
            <div className={"user-view"}>
                <div className={"user-info"}>
                    <span>{this.username}</span>
                    <div className={"user-pic"}></div>
                    <p className={"user-info"}>
                        Lorem ipsum dolor sit amet...
                    </p>
                    {this.state.followed ?
                        (<button onClick={this.unfollow}>Unfollow</button>) :
                        (<button onClick={this.follow}>Follow</button>)
                    }
                </div>
                <div className={"post-container"}>
                    {this.state.posts.map(data => <Post key={data.id} data={data}/>)}
                </div>
            </div>
        );
    }
}

export default UserView;