import React from "react";

class NewCommentComponent extends React.Component {
    render() {
        return (
            <div className={"new-comment"}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.props.submit({postId: this.props.postId, comment: this.props.content});
                    }}>
                    <input autoComplete={"off"} id="content" value={this.props.content}
                           onChange={this.props.onInputChange}
                           type={"text"}/>
                    <button type={"submit"}>Send</button>
                </form>
            </div>
        );
    }
}

export default NewCommentComponent;
