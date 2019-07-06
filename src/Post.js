import React from "react";
import {NavLink} from "react-router-dom";
import Comment from "./Comment";
import NewComment from "./NewComment";
import SimplePost from "./SimplePost";
import RetweetWithoutComment from "./RetweetWithoutComment";
import RetweetWithComment from "./RetweetWithComment";
import Retweet from "./Retweet";

class Post extends React.Component {
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
        this.openCommentSection = this.openCommentSection.bind(this);
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

        // Update posts table so that any post can be a retweet of another post
        // user1 retweeted
        //  user2's post
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

    componentDidMount() {
        if (this.props.data.retweet !== null) {
            fetch(this.serverUrl + "/posts/" + this.props.data.retweet, {method: "GET"}).then(
                res => res.json()
            ).then(res => {
                this.setState({data: res});
            });
        }
        let url = this.serverUrl + "/users/" + this.props.data.username + "/img";
        console.log("USER IMAGE URL:", url);
        let start = new Date();
        fetch(url, {
            method: "GET"
        }).then(
            res => {
                console.log("HERE");
                return res.text();
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
        let header;
        if (this.props.data.retweet === null) {
            console.log("NO RETWEET");

            return (
                <div className={"post-main"}>
                    <SimplePost data={this.props.data}/>
                </div>
            );
        } else {
            return (
                <div className={"post-main"}>
                    <Retweet data={this.props.data}/>
                </div>
            );
            // if (this.props.data.content === ""){
            //     console.log("RETWEET WITHOUT COMMENT");
            //     return (
            //
            //         <RetweetWithoutComment data={this.props.data}/>
            //     );
            // } else {
            //     console.log("RETWEET WITH COMMENT")
            //     return (
            //         <RetweetWithComment data={this.props.data}/>
            //     );
            // }
        }
        // return (
        //     <div className={"post"}>
        //         {header}
        //         <div className={"post-content"}>{this.props.data.content}</div>
        //         <div className={"post-footer"}>
        //             <button onClick={this.openCommentSection}>Reply</button>
        //             <button onClick={this.retweet}>Retweet</button>
        //         </div>
        //
        //         {this.state.commentSection ? (<div>
        //             <NewComment onSubmit={this.onNewComment} postId={this.props.data.id}/>
        //             {this.state.comments.map(comment => <Comment data={comment} key={comment.id}/>)}
        //         </div>) : null}
        //     </div>
        // );
    }
}

export default Post;