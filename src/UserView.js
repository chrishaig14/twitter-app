import React from "react";
import Post from "./Post";

class UserView extends React.Component {
    render() {
        return (
            <div className={"user-view"}>
                <div className={"user-info"}>
                    <span>username</span>
                    <div className={"user-pic"}></div>
                    <p className={"user-info"}>
                        Lorem ipsum dolor sit amet...
                    </p>
                    <button>Follow</button>
                    <button>Unfollow</button>
                </div>
                <div className={"user-posts"}>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        );
    }
}

export default UserView;