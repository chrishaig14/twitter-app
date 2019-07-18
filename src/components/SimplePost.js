import React from "react";
import {NavLink} from "react-router-dom";
import Comment from "./Comment";
import UserPic from "./UserPic";
import PostContent from "./PostContent";
import NewCommentComponent from "./NewCommentComponent";

class SimplePost extends React.Component {
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
        this.state = {commentSection: false, userpic: "", comments: []};
        this.onNewComment = this.onNewComment.bind(this);
        this.retweet = this.retweet.bind(this);
        this.token = this.str_obj(document.cookie).token;

    }

    onNewComment(comment) {
        console.log("ON NEW COMMENT!°");
        this.setState((state) => {
            state.comments.push(comment);
            return state;
        });
    }

    retweet() {
        let post_id = this.props.data.id;
        fetch(this.serverUrl + "/posts",
            {
                method: "POST",
                headers: {"Authorization": this.token},
                body: JSON.stringify({content: "r", retweet: post_id})
            }
        ).then(
            res => {
                if (res.ok) {
                    console.log("RETWEETED OK!");
                } else {
                    console.log("COULD NOT RETWEET!");
                }
            }
        );
        console.log("retweeting!");
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
        let date = (new Date(this.props.data.timestamp));
        return (
            <div className={"simple-post"}>

                <div className={"post-header"}>

                    <UserPic username={this.props.data.username}/>
                    <NavLink to={{pathname: "/users/" + this.props.data.username, state: {token: this.props.token}}}
                             className={"post-user"}>{this.props.data.username}</NavLink>
                    <span className="post-time">{this.dateToString(date)}</span>
                </div>


                <PostContent content={this.props.data.content}/>


                {this.state.commentSection ? (<div>
                    <NewCommentComponent onSubmit={this.onNewComment} postId={this.props.data.id}/>
                    {this.state.comments.map(comment => <Comment data={comment} key={comment.id}/>)}
                </div>) : null}
            </div>
        );
    }
}

export default SimplePost;