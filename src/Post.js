import React from "react";
import SimplePost from "./SimplePost";
import Quote from "./Quote";

class Post extends React.Component {
    serverUrl = "http://localhost:8888";

    str_obj(str) {
        str = str.split("; ");
        const result = {};
        for (let i = 0; i < str.length; i++) {
            const cur = str[i].split("=");
            result[cur[0]] = cur[1];
        }
        return result;
    }

    constructor(props) {
        super(props);
        this.openCommentSection = this.openCommentSection.bind(this);
        this.state = {
            commentSection: false,
            comments: [],
            retweetingWithComment: false,
            retweetValue: "",
            quoteVal: null
        };
        this.onNewComment = this.onNewComment.bind(this);
        this.token = this.str_obj(document.cookie).token;
        this.onSubmitRetweet = this.onSubmitRetweet.bind(this);
        this.share = this.share.bind(this);
        this.quote = this.quote.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
    }

    onCommentChange(event) {
        this.setState({retweetValue: event.target.value});
    }


    quote() {
        this.setState({retweetingWithComment: true});
    }

    onSubmitRetweet(event) {
        fetch(this.serverUrl + "/posts",
            {
                method: "POST",
                headers: {"Authorization": this.token},
                body: JSON.stringify({content: this.state.retweetValue, retweet: this.props.data.id})
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

        event.preventDefault();
    }

    share() {
        let post_id = this.props.data.id;
        fetch(this.serverUrl + "/shares",
            {
                method: "POST",
                headers: {"Authorization": this.token},
                body: JSON.stringify({post_id: post_id})
            }
        ).then(
            res => {
                if (res.ok) {
                    console.log("SHARED POST OK!");
                } else {
                    console.log("COULD NOT SHARE POST!");
                }
            }
        );
    }
    onNewComment(comment) {
        console.log("ON NEW COMMENT!°");
        this.setState((state) => {
            state.comments.push(comment);
            return state;
        });
    }

    componentDidMount() {
        fetch(this.serverUrl + "/posts/" + this.props.data.retweet,
            {
                method: "GET",
                headers: {"Authorization": this.token}
            }
        ).then(
            res =>
                res.json()
        ).then(res => {
            this.setState({quoteVal: res});
        });

        // event.preventDefault();
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

    render() {
        let footer =
            <div className={"post-footer"}>
                <button onClick={this.share}>Share</button>
                <button onClick={this.quote}>Quote</button>
                {this.state.retweetingWithComment ?
                    <form onSubmit={this.onSubmitRetweet} className={"quote-form"}>
                        <input type={"text"} onChange={this.onCommentChange}/>
                        <button type={"submit"}>Post!</button>
                    </form>
                 : null}
            </div>;
        return (<div className={"main-post"}>
                <SimplePost data={this.props.data}/>
                {this.state.quoteVal ? <Quote data={this.state.quoteVal}/> : null}
                <hr/>
                {footer}
            </div>
        );

        // // return (
        // //
        //     <div className={"post"}>
        //         // {header}
        //         // <div className={"post-content"}>{this.props.data.content}</div>
        //         // <div className={"post-footer"}>
        //         // <button onClick={this.openCommentSection}>Reply</button>
        //         // <button onClick={this.retweet}>Retweet</button>
        //         // </div>
        //         //
        //         // {this.state.commentSection ? (<div>
        //         // <NewComment onSubmit={this.onNewComment} postId={this.props.data.id}/>
        //         // {this.state.comments.map(comment => <Comment data={comment} key={comment.id}/>)}
        //         // </div>) : null}
        //         // </div>;
        // ;
        // ;
        // // );
        // // }
    }
}

export default Post;