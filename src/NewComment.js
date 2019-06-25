import React from "react";

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.submitComment = this.submitComment.bind(this);
    }

    submitComment(event) {
        console.log("submitting comment!");
    }

    render() {
        return (
            <div className={"new-comment"}>
                <form onSubmit={this.submitComment}>
                    <label>COMMENT<input type={"text"}/></label>
                    <button type={"submit"}>Send</button>
                </form>
            </div>
        );
    }
}

export default NewComment;