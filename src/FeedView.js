import React from "react";
import Post from "./Post";
import {NavLink, Redirect} from "react-router-dom";
import SearchBox from "./SearchBox";
import NewPost from "./NewPost";

class FeedView extends React.Component {

    serverUrl = "http://localhost:8888";
    token = "";
    username = "";

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {"posts": [], toHome: false};
        this.token = this.props.location.state.token;
        this.addNewPost = this.addNewPost.bind(this);
    }

    logout() {
        console.log("Logging out!");
        this.setState({toHome: true});
    }

    componentDidMount() {
        fetch(this.serverUrl + "/users/me", {
            method: "GET",
            headers: {
                "Authorization": this.token
            }
        }).then(
            res => res.json()
        ).then(
            res => {
                this.username = res.username;
                console.log("received current user data: ", res);
            }
        );
        fetch(this.serverUrl + "/feed", {
            method: "GET",
            headers: {
                "Authorization": this.token
            }
        }).then(
            (res) => {
                return res.json();
            }
        ).then(
            body => {
                console.log("BODY; ", body);
                this.setState({"posts": body});
                return body;
            }
        );
    }

    addNewPost(post) {
        console.log("ADDING POST: ", post);
        this.setState(state => {
            state.posts.unshift(post);
            return {posts: state.posts};
        }, () => console.log("posts:", this.state.posts));
    }

    render() {
        if (this.state.toHome) {
            return (<Redirect to={"/"}/>);
        }
        return (

            <div className={"feed-view"}>
                {/*FEED VIEW*/}
                <div className={"feed-header"}>
                    <SearchBox/>
                    <button onClick={this.logout}>Logout</button>
                </div>

                <div className={"feed-main"}>
                    <div className={"user-info"}>
                        <span className={"user-info-username"}>{this.username}</span>
                        <div className={"user-info-pic"}></div>
                        <p className={"user-info-info"}>Lorem ipsum dolor sit amet...</p>

                    </div>
                    <div className={"post-container"}>
                        <NewPost token={this.token} onPost={this.addNewPost}/>
                        {this.state.posts.map((data) => <Post key={data.id} data={data}/>)}
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default FeedView;