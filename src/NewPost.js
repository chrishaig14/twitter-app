import React from "react";

class NewPost extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {"post": ""};
        this.onSubmit = this.onSubmit.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
    }

    onSubmit(event) {
        fetch(this.serverUrl + "/posts", {
            method: "POST",
            headers: {"Authorization": this.props.token},
            body: JSON.stringify({content: this.state.post})
        }).then(
            res => {
                if (res.ok) {
                    console.log("POST OK!");
                    console.log(this.props.onPost);
                    console.log("RES: ", res);
                    this.setState({post: ""});
                } else {
                    console.log("POST NOT OK!");
                }
                return res.json();
            }
        ).then(
            res => {
                this.props.onPost(res);
                console.log("FINAL RES: ", res);
            }
        );
        event.preventDefault();
    }

    onContentChange(event) {
        this.setState({post: event.target.value});
    }

    render() {
        return (
            <div className={"new-post"}>
                {/*<h1>New post</h1>*/}
                <form onSubmit={this.onSubmit}>
                    <input className={"new-post-text"} required={true} value={this.state.post} type={"text"}
                           onChange={this.onContentChange}/>
                    <button type={"submit"}>Post!</button>
                </form>
            </div>
        );
    }
}

export default NewPost;