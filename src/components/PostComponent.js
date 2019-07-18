import React from "react";
import SimplePost from "./SimplePost";
import Quote from "./Quote";

class PostComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentSection: false,
            comments: [],
            retweetingWithComment: false,
            retweetValue: "",
            quoteVal: null
        };
        this.onNewComment = this.onNewComment.bind(this);
        this.quote = this.quote.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
    }

    onCommentChange(event) {
        this.setState({retweetValue: event.target.value});
    }


    quote() {
        this.setState({retweetingWithComment: true});
    }

    onNewComment(comment) {
        console.log("ON NEW COMMENT!°");
        this.setState((state) => {
            state.comments.push(comment);
            return state;
        });
    }

    render() {
        let footer =
            <div className={"post-footer"}>
                <button onClick={() => this.props.share(this.props.id)}>Share</button>
                <button onClick={this.quote}>Quote</button>
                {this.state.retweetingWithComment ?
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.props.retweet({content: this.state.retweetValue});
                    }} className={"quote-form"}>
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
    }
}

export default PostComponent;