import React from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import Share from "./Share";

class FeedView extends React.Component {

    serverUrl = "http://localhost:8888";
    token = "";
    username = "";

    str_obj(str) {
        str = str.split("; ");
        const result = {};
        for (let i = 0; i < str.length; i++) {
            const cur = str[i].split("=");
            result[cur[0]] = cur[1];
        }
        return result;
    }

    constructor(props) {
        super(props);

        this.state = {"posts": [], toHome: false, shares:[]};
        this.token = this.str_obj(document.cookie).token;
        console.log("TOKEN : ", this.token);

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
            res => {
                console.log("BODY; ", res);
                this.setState({"posts": res.posts, "shares": res.shares});
                return res;
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
                <NewPost token={this.token} onPost={this.addNewPost}/>
                <div className={"post-container"}>
                    {this.state.posts.map(data => <Post key={data.timestamp} data={data} token={this.token}/>)}
                    {this.state.shares.map(data => <Share key={data.timestamp} data={data}/>)}
                </div>
            </div>
        );
    }
}

export default FeedView;