import React from "react";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        console.log("CONSTRUCTNG COMMENT WITH: ", this.props.data)
    }

    render() {
        return (
            <div className={"comment"}>
                {/*<h1>Comment</h1>*/}
                <div className={"comment-user-pic"}></div>
                <a href="" className={"comment-user"}>{this.props.data.username}</a>
                <div className={"comment-content"}>{this.props.data.content}</div>
            </div>
        );
    }
}

export default Comment;