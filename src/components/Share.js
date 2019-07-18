import React from "react";
import {NavLink} from "react-router-dom";
import PostComponent from "./PostComponent";

class Share extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {post_data: null};
    }

    render() {
        return (
            <div className={"share"}>
                <div className={"share-header"}>

                    <span><NavLink className={"post-user"}
                                   to={"/users/" + this.props.data.username}>{this.props.data.username}</NavLink> shared</span>
                </div>
                <hr/>
                {this.state.post_data ? <PostComponent data={this.state.post_data}/> : null}
            </div>
        );
    }
}

export default Share;