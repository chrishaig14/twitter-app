import React from "react";
import {NavLink} from "react-router-dom";
import Comment from "./Comment";
import UserPic from "./UserPic";
import PostContent from "./PostContent";
import NewCommentComponent from "./NewCommentComponent";
import NewCommentContainer from "../containers/NewCommentContainer";

class PostComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {commentSection: false, userpic: "", comments: []};
        this.onNewComment = this.onNewComment.bind(this);
        this.openCommentSection = this.openCommentSection.bind(this);
    }

    onNewComment(comment) {
        console.log("ON NEW COMMENT!°");
        this.setState((state) => {
            state.comments.push(comment);
            return state;
        });
    }

    static dateToString(date) {
        let now = new Date();
        let strDate = "";
        if (date.toDateString() === now.toDateString()) {
            strDate = date.toLocaleTimeString();
        } else {
            strDate = date.toDateString() + " at " + date.toLocaleTimeString();
        }
        return strDate;
    }

    openCommentSection() {
        this.setState({commentSection: true});
        this.props.fetchComments(this.props.data.id);
    }

    render() {
        let date = (new Date(this.props.data.timestamp));
        return (
            <div className={"simple-post"}>

                <div className={"post-header"}>

                    <UserPic username={this.props.data.username}/>
                    <NavLink to={{pathname: "/users/" + this.props.data.username, state: {token: this.props.token}}}
                             className={"post-user"}>{this.props.data.username}</NavLink>
                    <span className="post-time">{PostComponent.dateToString(date)}</span>
                </div>


                <PostContent content={this.props.data.content}/>

                <button onClick={this.openCommentSection}>Comments</button>
                {this.state.commentSection ? (<div>

                    {this.props.data.comments.map(comment => <Comment data={comment} key={comment.id}/>)}
                    <NewCommentContainer postId={this.props.data.id}/>
                </div>) : null}
            </div>
        );
    }
}

export default PostComponent;