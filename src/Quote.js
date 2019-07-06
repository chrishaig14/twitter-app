import React from "react";
import {NavLink} from "react-router-dom";
import NewComment from "./NewComment";
import Comment from "./Comment";
import UserPic from "./UserPic";

class Quote extends React.Component {

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
        this.state = {userpic: ""};
        this.token = this.str_obj(document.cookie).token;
    }

    componentDidMount() {
        let url = this.serverUrl + "/users/" + this.props.data.username + "/img";
        console.log(" QUOTE USER IMAGE URL:", url);
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

    render() {
        return (
            <div className={"quote"}>
                Quote
                <div className={"post-header"}>
                    {/*<img src={this.state.userpic} className={"post-user-pic"}/>*/}
                    <UserPic username={this.props.data.username}/>
                    <NavLink to={{pathname: "/users/" + this.props.data.username, state: {token: this.props.token}}}
                             className={"post-user"}>{this.props.data.username}</NavLink>
                    {/*<span className="post-time">{this.dateToString(date)}</span>*/}
                </div>
                <div className={"post-content"}>{this.props.data.content}</div>

                {this.state.commentSection ? (<div>
                    <NewComment onSubmit={this.onNewComment} postId={this.props.data.id}/>
                    {this.state.comments.map(comment => <Comment data={comment} key={comment.id}/>)}
                </div>) : null}
            </div>
        );
    }
}

export default Quote;