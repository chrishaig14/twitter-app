import React from "react";

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.submitComment = this.submitComment.bind(this);
    }

    submitComment(event) {
        console.log("submitting comment!");
        event.preventDefault();
    }

    render() {
        return (
            <div className={"new-comment"}>
                <form onSubmit={this.submitComment}>
                    <label for="content">COMMENT</label>
                    <input autoComplete={"off"} id="content" type={"text"}/>
                    <button type={"submit"}>Send</button>
                </form>
            </div>
        );
    }
}

export default NewComment;