import React from "react";
import Post from "./Post";
import {NavLink} from "react-router-dom";
import SearchBox from "./SearchBox";

class FeedView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"feed-view"}>
                FEED VIEW
                <div className={"feed-header"}>
                    <SearchBox/>
                    <button>Logout</button>
                </div>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        );
    }
}

export default FeedView;