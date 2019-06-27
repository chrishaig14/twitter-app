import React from "react";
import Post from "./Post";

class UserView extends React.Component {
    serverUrl = "http://localhost:8888";
    username = "";

    constructor(props) {
        super(props);
        console.log("username: ", this.props.match.params.id);
        this.username = this.props.match.params.id;
        this.state = {"posts": []};
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

    }

    render() {
        return (
            <div className={"user-view"}>
                <div className={"user-info"}>
                    <span>{this.username}</span>
                    <div className={"user-pic"}></div>
                    <p className={"user-info"}>
                        Lorem ipsum dolor sit amet...
                    </p>
                    <button>Follow</button>
                    <button>Unfollow</button>
                </div>
                <div className={"post-container"}>
                    {this.state.posts.map(data => <Post key={data.id} data={data}/>)}
                </div>
            </div>
        );
    }
}

export default UserView;