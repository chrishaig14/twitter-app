import React from "react";

class NewCommentComponent extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {comment: ""};
    //     this.onInputChange = this.onInputChange.bind(this);
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     // console.log("NEW PROPS!, ", this.props.ok);
    //     if (this.props.ok && !prevProps.ok) {
    //         this.setState({comment: ""});
    //     }
    // }

    // onInputChange(event) {
    //     this.setState({comment: event.target.value});
    // }

    render() {
        return (
            <div className={"new-comment"}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.props.submit({postId: this.props.postId, comment: this.props.content});
                    }}>
                    {/*<label for="content">COMMENT</label>*/}
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