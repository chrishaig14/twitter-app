import React from "react";

class Comment extends React.Component {
    render() {
        return (
            <div className={"comment"}>
                <h1>Comment</h1>
                <div className={"comment-user-pic"}></div>
                <a href="" className={"comment-user"}>username</a>
                <div className={"comment-content"}>Lorem ipsum dolor sit amet</div>
            </div>
        );
    }
}

export default Comment;