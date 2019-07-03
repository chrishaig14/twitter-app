import React from "react";
import {NavLink} from "react-router-dom";
import Comment from "./Comment";
import NewComment from "./NewComment";

class Post extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.openCommentSection = this.openCommentSection.bind(this);
        this.state = {commentSection: false, userpic: "", comments: []};
        this.onNewComment = this.onNewComment.bind(this);
    }

    onNewComment(comment) {
        console.log("ON NEW COMMENT!°");
        this.setState((state) => {
            state.comments.push(comment);
            return state;
        });
    }

    componentDidMount() {
        let url = this.serverUrl + "/users/" + this.props.data.username + "/img";
        console.log("USER IMAGE URL:", url);
        let start = new Date();
        fetch(url, {
            method: "GET"
        }).then(
            res => {

                console.log("HERE");

                return res.text();
                // return res.json();
            }
        ).then(
            res => {
                let end = new Date();
                console.log("TOOK ", end - start);
                console.log(`GOT USER ${this.props.data.username} POSTS:`, res);
                this.setState({"userpic": res});
            }
        );
    }

    openCommentSection() {
        console.log("opening comment section for post");
        fetch(this.serverUrl + "/posts/" + this.props.data.id + "/comments", {
            method: "GET"
        }).then(res => res.json()).then(
            res => {
                this.setState({commentSection: true, comments: res});
            }
        );

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
                    <NewComment onSubmit={this.onNewComment} postId={this.props.data.id}/>
                    {this.state.comments.map(comment => <Comment data={comment} key={comment.id}/>)}
                    {/*<Comment/>*/}
                    {/*<Comment/>*/}
                    {/*<Comment/>*/}
                    {/*<Comment/>*/}
                </div>) : null}
            </div>
        );
    }
}

export default Post;