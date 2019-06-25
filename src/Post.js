import React from "react";
import {NavLink} from "react-router-dom";

class Post extends React.Component {
    render() {
        return (
            <div className={"post"}>
                <h1>Post</h1>
                <div className={"post-header"}>
                    <div className={"post-user-pic"}></div>
                    <NavLink to={"/user/" + "username"} className={"post-user"}>username</NavLink>
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