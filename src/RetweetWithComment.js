import React from "react";
import SimplePost from "./SimplePost";
import {NavLink} from "react-router-dom";
import NewComment from "./NewComment";
import Comment from "./Comment";
import Quote from "./Quote";
import UserPic from "./UserPic";

class RetweetWithComment extends React.Component {
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
        this.state = {retweet: null, retweeting: false};
        this.token = this.str_obj(document.cookie).token;
        // this.retweetWithoutComment = this.retweetWithoutComment.bind(this);
        // this.retweetWithComment = this.retweetWithComment.bind(this);
        this.onWrite = this.onWrite.bind(this);
        this.submitRetweet = this.submitRetweet.bind(this);
    }

    componentDidMount() {
        fetch(this.serverUrl + "/posts/" + this.props.data.retweet, {method: "GET"}).then(
            res => res.json()
        ).then(
            res => {
                console.log("GOT RETWEETED POST CONTENT: ", res);
                this.setState({retweet: res});
            }
        );
    }


    retweetWithComment() {
        this.setState({retweeting: true});
    }

    onWrite(event) {
        this.setState({retweetValue: event.target.value});
    }

    submitRetweet(event) {
        console.log("SUBMITTING RETWEET WITH COMMENT: ", this.state.retweetValue);
        let post_id = this.props.data.id;
        fetch(this.serverUrl + "/posts",
            {
                method: "POST",
                headers: {"Authorization": this.token},
                body: JSON.stringify({content: this.state.retweetValue, retweet: post_id})
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
        event.preventDefault();
    }

    render() {
        let data = this.props.retweet;

        return (
            <div className={"retweet-w-comment"}>
                <div className={"retweet-header"}>
                    <UserPic username={this.props.data.username}/>

                    <span><NavLink>{this.props.data.username}</NavLink></span>
                </div>
                <hr/>
                <div className={"retweet-content"}>
                    {this.props.data.content}
                </div>
                {this.state.retweet ? <Quote data={this.state.retweet}/> : null}
                {this.state.retweeting ?
                    <div>
                        <form onSubmit={this.submitRetweet}>
                            <input type={"text"} placeholder={"Your comment "} onChange={this.onWrite}/>
                        </form>
                    </div>
                    : null}
            </div>
        );
    }
}

export default RetweetWithComment;