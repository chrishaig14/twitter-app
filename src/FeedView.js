import React from "react";
import Post from "./Post";
import {NavLink} from "react-router-dom";
import SearchBox from "./SearchBox";
import NewPost from "./NewPost";

class FeedView extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        console.log("Logging out!");
    }

    render() {
        return (
            <div className={"feed-view"}>
                FEED VIEW
                <div className={"feed-header"}>
                    <SearchBox/>
                    <button onClick={this.logout}>Logout</button>
                </div>

                <div className={"feed-main"}>
                    <div className={"user-info"}>
                        <span className={"user-info-username"}>username</span>
                        <div className={"user-info-pic"}></div>
                        <p className={"user-info-info"}>Lorem ipsum dolor sit amet...</p>

                    </div>
                    <div className={"post-container"}>
                        <NewPost/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedView;