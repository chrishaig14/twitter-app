import React from "react";
import SimplePost from "./SimplePost";
import {NavLink} from "react-router-dom";
import UserPic from "./UserPic";
import Post from "./Post";

class Share extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {post_data: null};
    }


    componentDidMount() {
        console.log("GETTING SHARED POST: ", this.props.data.post_id);
        fetch(this.serverUrl + "/posts/" + this.props.data.post_id, {method: "GET"}).then(
            res => res.json()
        ).then(
            res => {
                this.setState({post_data: res});
            }
        );
    }

    render() {
        return (
            <div className={"share"}>
                <div className={"share-header"}>
                    {/*<UserPic username={this.props.data.username}/>*/}
                    <span><NavLink>{this.props.data.username}</NavLink> shared</span>
                </div>
                <hr/>
                {this.state.post_data ? <Post data={this.state.post_data}/> : null}
            </div>
        );
    }
}

export default Share;