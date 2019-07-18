import React from "react";

class NewCommentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {comment: ""};
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({comment: event.target.value});
    }


    render() {
        return (
            <div className={"new-comment"}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.props.submit({postId: this.props.postId, comment: this.state.comment});
                    }}>
                    {/*<label for="content">COMMENT</label>*/}
                    <input autoComplete={"off"} id="content" value={this.state.comment} onChange={this.onInputChange}
                           type={"text"}/>
                    <button type={"submit"}>Send</button>
                </form>
            </div>
        );
    }
}

export default NewCommentComponent;