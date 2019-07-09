import React from "react";

class NewComment extends React.Component {
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
        this.submitComment = this.submitComment.bind(this);
        this.state = {comment: ""};
        this.onInputChange = this.onInputChange.bind(this);
        this.token = this.str_obj(document.cookie).token;

    }

    onInputChange(event) {
        this.setState({comment: event.target.value});
    }

    submitComment(event) {
        console.log("submitting comment!");
        fetch(this.serverUrl + "/posts/" + this.props.postId + "/comments", {
            method: "POST",
            body: JSON.stringify({content: this.state.comment, parent: -1}),
            headers: {"authorization": this.token}
        }).then(
            res => res.json()
        ).then(
            res => {
                this.props.onSubmit(res);
                console.log("NEW COMMENT POSTED: ", res);
            }
        );
        event.preventDefault();
    }

    render() {
        return (
            <div className={"new-comment"}>
                <form onSubmit={this.submitComment}>
                    <label for="content">COMMENT</label>
                    <input autoComplete={"off"} id="content" value={this.state.comment} onChange={this.onInputChange}
                           type={"text"}/>
                    <button type={"submit"}>Send</button>
                </form>
            </div>
        );
    }
}

export default NewComment;