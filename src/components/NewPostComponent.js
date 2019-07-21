import React from "react";

class NewPostComponent extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {"post": ""};
        this.onContentChange = this.onContentChange.bind(this);
    }

    onContentChange(event) {
        this.setState({post: event.target.value});
    }

    render() {
        return (
            <div className={"new-post"}>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(this.state.post);
                }}>
                    <input className={"new-post-text"} required={true} value={this.state.post} type={"text"}
                           onChange={this.onContentChange}/>
                    <button type={"submit"}>Post!</button>
                </form>
            </div>
        );
    }
}

export default NewPostComponent;