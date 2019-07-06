import React from "react";
import {NavLink} from "react-router-dom";
import UserPic from "./UserPic";

class Comment extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        console.log("CONSTRUCTNG COMMENT WITH: ", this.props.data);
        this.state = {userpic: ""};
    }

    componentDidMount() {
        fetch(this.serverUrl + "/users/" + this.props.data.username + "/img",
            {method: "GET"}).then(
            res => res.text()
        ).then(
            res => {
                this.setState({userpic: res});
            }
        );
    }

    render() {
        return (
            <div className={"comment"}>
                {/*<h1>Comment</h1>*/}
                {/*<img className={"comment-user-pic"} src={this.state.userpic}/>*/}
                <UserPic username={this.props.data.username}/>
                <NavLink to={"/users/"+this.props.data.username} className={"comment-user"}>{this.props.data.username}</NavLink>
                <div className={"comment-content"}>{this.props.data.content}</div>
            </div>
        );
    }
}

export default Comment;