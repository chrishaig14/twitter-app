import React from "react";

class NewPostComponent extends React.Component {
    render() {
        return (
            <div className={"new-post"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(this.props.content);
                }}>
                    <input className={"new-post-text"} required={true} value={this.props.content} type={"text"}
                           onChange={(e) => this.props.onContentChange(e.target.value)}/>
                    <button type={"submit"}>Post!</button>
                </form>
            </div>
        );
    }
}

export default NewPostComponent;
