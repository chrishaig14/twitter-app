import React from "react";
import Post from "./Post";
import {NavLink} from "react-router-dom";
import SearchBox from "./SearchBox";
import NewPost from "./NewPost";

class FeedView extends React.Component {

    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {"posts": []};
    }

    logout() {
        console.log("Logging out!");
    }

    componentDidMount() {
        fetch(this.serverUrl + "/feed", {
            method: "GET",
            headers: {
                "Authorization": this.props.location.state.username
            }
        }).then(
            (res) => {
                return res.json();
            }
        ).then(
            body => {
                console.log("BODY; ", body);
                this.setState({"posts": body});
                // for (let post of body) {
                //     console.log("POST #", post);
                //
                // }
                return body;
            }
        );
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
                        {this.state.posts.map((data) => <Post key={data.id} data={data}/>)}
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default FeedView;