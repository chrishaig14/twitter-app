import React from "react";
import {NavLink} from "react-router-dom";
import Comment from "./Comment";
import NewComment from "./NewComment";

class Post extends React.Component {
    serverUrl ="http://localhost:8888"
    constructor(props) {
        super(props);
        this.openCommentSection = this.openCommentSection.bind(this);
        this.state = {commentSection: false, userpic: ""};
    }

    componentDidMount() {
        let url = this.serverUrl + "/users/" + this.props.data.username+"/img";
        console.log("USER IMAGE URL:", url);
        fetch(url, {
            method: "GET"
        }).then(
            res => {
                console.log("HERE");

return                res.text()
                // return res.json();
            }
        ).then(
            res => {
                console.log(`GOT USER ${this.props.data.username} POSTS:`, res);
                this.setState({"userpic": res});
            }
        );
    }

    openCommentSection() {
        console.log("opening comment section for post");
        this.setState({commentSection: true});
    }

    dateToString(date) {
        let now = new Date();
        let strDate = "";
        if (date.toDateString() === now.toDateString()) {
            strDate = date.toLocaleTimeString();
        } else {
            strDate = date.toDateString() + " at " + date.toLocaleTimeString();
        }
        return strDate;
    }

    render() {
        // console.log("DATE IS: ", new Date(this.props.data.timestamp));
        let date = (new Date(this.props.data.timestamp));
        return (
            <div className={"post"}>
                {/*<h1>Post</h1>*/}
                <div className={"post-header"}>
                    <img src={this.state.userpic} className={"post-user-pic"}></img>
                    <NavLink to={{pathname: "/users/" + this.props.data.username, state: {token: this.props.token}}}
                             className={"post-user"}>{this.props.data.username}</NavLink>
                    <span className="post-time">{this.dateToString(date)}</span>
                </div>
                <div className={"post-content"}>{this.props.data.content}</div>
                <div className={"post-footer"}>
                    <button onClick={this.openCommentSection}>Reply</button>
                    <button>Retweet</button>
                </div>

                {this.state.commentSection ? (<div>
                    <NewComment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                    <Comment/>
                </div>) : null}
            </div>
        );
    }
}

export default Post;