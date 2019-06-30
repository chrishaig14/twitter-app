import React from "react";
import Post from "./Post";
import {NavLink, Redirect} from "react-router-dom";
import SearchBox from "./SearchBox";
import NewPost from "./NewPost";
import Header from "./Header";

class FeedView extends React.Component {

    serverUrl = "http://localhost:8888";
    token = "";
    username = "";

    str_obj(str) {
        str = str.split("; ");
        var result = {};
        for (var i = 0; i < str.length; i++) {
            var cur = str[i].split("=");
            result[cur[0]] = cur[1];
        }
        return result;
    }

    constructor(props) {
        super(props);
        // this.logout = this.logout.bind(this);
        this.state = {"posts": [], toHome: false};
        this.token = this.str_obj(document.cookie).token;
        console.log("TOKEN : ", this.token);
        // this.token = this.props.location.state.token;
        this.addNewPost = this.addNewPost.bind(this);
    }


    componentDidMount() {

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

        return (

            <div className={"feed-view"}>
                {/*FEED VIEW*/}

                <Header/>

                <div className={"feed-main"}>
                    {/*<div className={"user-info"}>*/}
                    {/*    <span className={"user-info-username"}>{this.username}</span>*/}
                    {/*    <div className={"user-info-pic"}></div>*/}
                    {/*    <p className={"user-info-info"}>Lorem ipsum dolor sit amet...</p>*/}

                    {/*</div>*/}
                    <div className={"main-post"}>
                        <NewPost token={this.token} onPost={this.addNewPost}/>
                        <div className={"post-container"}>

                            {this.state.posts.map((data) => <Post key={data.id} data={data} token={this.token}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default FeedView;