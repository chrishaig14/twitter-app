import React from "react";

class NewCommentComponent extends React.Component {
    render() {
        return (
            <div className={"new-comment"}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.props.submit(this.props.postId, this.props.content);
                    }}>
                    <input autoComplete={"off"} id="content" value={this.props.content}
                           onChange={(e) => this.props.onInputChange(this.props.postId, e.target.value)}
                           type={"text"}/>
                    <button type={"submit"}>Send</button>
                </form>
            </div>
        );
    }
}

export default NewCommentComponent;
