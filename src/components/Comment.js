import React from "react";
import {NavLink} from "react-router-dom";
import UserPicContainer from "../containers/UserPicContainer";

class Comment extends React.Component {
    render() {
        return (
            <div className={"comment"}>

                <UserPicContainer username={this.props.data.username}/>
                <NavLink to={"/users/" + this.props.data.username}
                         className={"comment-user"}>{this.props.data.username}</NavLink>
                <div className={"comment-content"}>{this.props.data.content}</div>
            </div>
        );
    }
}

export default Comment;
