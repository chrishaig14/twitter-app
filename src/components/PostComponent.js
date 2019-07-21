import React from "react";
import {NavLink} from "react-router-dom";
import Comment from "./Comment";
// import UserPicComponent from "./UserPic";
import PostContent from "./PostContent";
import NewCommentComponent from "./NewCommentComponent";
import NewCommentContainer from "../containers/NewCommentContainer";
import UserPicContainer from "../containers/UserPicContainer";

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
        console.log("DATA:", this.props.data);
        let date = (new Date(this.props.data.timestamp));
        // console.log("this.props.data", this.props.data);
        return (
            <div className={"simple-post"}>
                {this.props.data.shares.length !== 0 ?
                    <div>
                        Shared by {this.props.data.shares.join(", ")}
                    </div>
                    :
                    null
                }
                {this.props.data.shares.length !== 0 ? <hr/> : null}
                <div className={"post-header"}>

                    <UserPicContainer username={this.props.data.username}/>
                    <NavLink to={{pathname: "/users/" + this.props.data.username}}
                             className={"post-user"}>{this.props.data.username}</NavLink>
                    <span className="post-time">{PostComponent.dateToString(date)}</span>
                </div>


                <PostContent content={this.props.data.content}/>
                {this.props.data.retweet !== null ?
                    <div className={"quote"}>
                        <UserPicContainer username={this.props.data.retweet.username}/>
                        <NavLink to={{pathname: "/users/" + this.props.data.retweet.username}}
                                 className={"post-user"}>{this.props.data.retweet.username}</NavLink>
                        {this.props.data.retweet.content}
                    </div> :
                    null
                }
                <div className={"post-footer"}>
                <button onClick={this.openCommentSection}>Comments</button>
                <button onClick={() => this.props.share(this.props.data.id)}>Share</button>
                </div>
                {this.state.commentSection ? (<div>

                    {this.props.data.comments.map(comment => <Comment data={comment} key={comment.id}/>)}
                    <NewCommentContainer postId={this.props.data.id}/>
                </div>) : null}
            </div>
        );
    }
}

export default PostComponent;