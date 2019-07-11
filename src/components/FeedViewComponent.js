import React from "react";
import PostComponent from "./PostComponent";
import NewPost from "./NewPost";
import Share from "./Share";

class FeedViewComponent extends React.Component {

    // serverUrl = "http://localhost:8888";
    // token = "";
    // username = "";
    //
    // str_obj(str) {
    //     str = str.split("; ");
    //     const result = {};
    //     for (let i = 0; i < str.length; i++) {
    //         const cur = str[i].split("=");
    //         result[cur[0]] = cur[1];
    //     }
    //     return result;
    // }
    //
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {"posts": [], toHome: false, shares:[]};
    //     this.token = this.str_obj(document.cookie).token;
    //     console.log("TOKEN : ", this.token);
    //
    //     this.addNewPost = this.addNewPost.bind(this);
    // }
    //
    //
    componentDidMount() {
        // console.log("ON MOUNT IS: ", this.props.onMount);
        this.props.onMount();
    }

    //     fetch(this.serverUrl + "/feed", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": this.token
    //         }
    //     }).then(
    //         (res) => {
    //             return res.json();
    //         }
    //     ).then(
    //         res => {
    //             console.log("BODY; ", res);
    //             this.setState({"posts": res.posts, "shares": res.shares});
    //             return res;
    //         }
    //     );
    // }
    //
    // addNewPost(post) {
    //     console.log("ADDING POST: ", post);
    //     this.setState(state => {
    //         state.posts.unshift(post);
    //         return {posts: state.posts};
    //     }, () => console.log("posts:", this.state.posts));
    // }

    render() {
        console.log("POSTLIST: ", this.props.postList);
        return (

            <div className={"feed-view"}>
                <NewPost onPost={this.props.addNewPost}/>
                <div className={"post-container"}>
                    {this.props.postList.map(data => <PostComponent key={data.timestamp} data={data}/>)}
                </div>
            </div>
        );
    }
}

export default FeedViewComponent;