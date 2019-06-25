import React from "react";

class NewPost extends React.Component {
    render() {
        return (
            <div className={"new-post"}>
                <h1>New post</h1>
                <form>
                    <input type={"text"}/>
                    <button type={"submit"}>Post!</button>
                </form>
            </div>
        );
    }
}

export default NewPost;