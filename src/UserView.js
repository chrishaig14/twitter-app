import React from "react";
import Post from "./Post";

class UserView extends React.Component {
    serverUrl = "http://localhost:8888";
    username = "";

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
        console.log("username: ", this.props.match.params.id);
        this.username = this.props.match.params.id;
        // this.token = this.props.location.state.token;
        this.token = this.str_obj(document.cookie).token;
        console.log("USER VIEW TOKEN : ", this.token);
        console.log("my token is: ", this.token);
        this.state = {"posts": [], followed: false};
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }

    componentDidMount() {
        console.log("SENDING REQUEST TO GET USER POSTS");
        fetch(this.serverUrl + "/users/" + this.username, {
            method: "GET"
        }).then(
            res => res.json()
        ).then(
            res => {
                console.log(`GOT USER ${this.username} POSTS:`, res);
                this.setState({"pic": res.pic});
            }
        );
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
        fetch(this.serverUrl + "/users/me/followees/" + this.username, {
            method: "PUT", headers: {"Authorization": this.token}
        }).then(
            res => {
                if (res.ok) {
                    console.log("NOW FOLLOWING USER: ", this.username);
                    this.setState({followed: true});
                }
            }
        );
    }

    unfollow() {
        fetch(this.serverUrl + "/users/me/followees/" + this.username, {
            method: "DELETE", headers: {"Authorization": this.token}
        }).then(
            res => {
                if (res.ok) {
                    console.log("STOPPED FOLLOWING USER: ", this.username);
                    this.setState({followed: false});
                }
            }
        );
    }

    render() {
        console.log("IS FOLLOWED: ", this.state.followed);
        return (
            <div className={"other-user-view"}>
                {/*<Header/>*/}
                <div className={"other-user-view-main"}>
                    <div className={"other-user-info"}>
                        <img className={"other-user-pic"} src={this.state.pic}></img>
                        <span className={"username"}>{this.username}</span>

                        {/*<p className={"other-user-info"}>*/}
                        {/*    Lorem ipsum dolor sit amet...*/}
                        {/*</p>*/}
                        {this.state.followed ?
                            (<button onClick={this.unfollow}>Unfollow</button>) :
                            (<button onClick={this.follow}>Follow</button>)
                        }
                    </div>

                    <div className={"post-main-container"}>
                        <h4 className={"user-posts-title"}>{this.username}'s posts</h4>
                        <div className={"post-container"}>

                            {this.state.posts.map(data => <Post key={data.id} data={data}/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserView;