import React from "react";

class Post extends React.Component {
    render() {
        return (
            <div className={"post"}>
                <h1>Post</h1>
                <div className={"post-header"}>
                    <div className={"post-user-pic"}></div>
                    <a className={"post-user"}>username</a>
                </div>
                <div className={"post-content"}>Lorem ipsum dolor sit amet</div>
                <div className={"post-footer"}>
                    <button>Reply</button>
                    <button>Retweet</button>
                </div>
            </div>
        );
    }
}

export default Post;