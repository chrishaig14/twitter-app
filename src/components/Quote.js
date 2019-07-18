import React from "react";
import {NavLink} from "react-router-dom";
import Comment from "./Comment";
import UserPic from "./UserPic";
import NewCommentComponent from "./NewCommentComponent";

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userpic: ""};
        this.token = this.str_obj(document.cookie).token;
    }

    render() {
        return (
            <div className={"quote"}>
                <div className={"post-header"}>
                    <UserPic username={this.props.data.username}/>
                    <NavLink to={{pathname: "/users/" + this.props.data.username, state: {token: this.props.token}}}
                             className={"post-user"}>{this.props.data.username}</NavLink>
                </div>
                <div className={"post-content"}>{this.props.data.content}</div>

                {this.state.commentSection ? (<div>
                    <NewCommentComponent onSubmit={this.onNewComment} postId={this.props.data.id}/>
                    {this.state.comments.map(comment => <Comment data={comment} key={comment.id}/>)}
                </div>) : null}
            </div>
        );
    }
}

export default Quote;