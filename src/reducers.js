import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import Cookies from "js-cookie";

function reducer(state = {}, action) {
    // console.log("REDUCER CALLED WITH ACTION: ", action, "AND STATE IS: ", state);
    let new_state = JSON.parse(JSON.stringify(state));
    // console.log("RECEVED USER IMAGE:", new_state);
    switch (action.type) {
        case "REQUEST FEED":
            break;
        case "RECEIVE FEED": {
            let postList = {};
            for (let post of action.data.posts) {
                post.comments = [];
                // post.shares = [];
                postList[post.id] = post;
            }
            // for (let post of action.data.posts) {
            //     post.comments = [];
            //     // post.shares = [];
            //     postList[post.id] = post;
            // }
            new_state.posts = postList;
        }
            break;
        case "USER IMAGE SELECT":
            new_state.currentUser.pic = action.pic;
            break;
        case "USER INFO CHANGE":
            new_state.currentUser.info = action.info;
            break;
        case "RECEIVE USER POSTS": {
            let postList = {};
            for (let post of action.data.posts) {
                post.comments = [];
                // post.shares = [];
                postList[post.id] = post;
            }
            new_state.posts = postList;
        }
            break;
        case "RECEIVE TOKEN":
            new_state.token = action.token;
            Cookies.set("token", action.token);
            break;
        case "LOGIN ERROR":
            new_state.loginError = action.loginError;
            break;
        case "RECEIVE NEW POST":
            let post = action.postData;
            post.comments = [];
            // post.shares = [];
            new_state.posts[post.id] = post;
            break;
        case "RECEIVE SHARED POST":
            // console.log("SHARE RECEIVED: post = ", action.postId);
            new_state.posts[action.postId].shares.push(action.username);
            break;
        case "SET FOLLOWED":
            new_state.userFollowed[action.username] = action.followed;
            break;
        case "RECEIVE SEARCH":
            new_state.searchResults = action.data;
            break;
        case "RECEIVE FOLLOWING":
            for (let username of action.following) {
                new_state.userFollowed[username] = true;
            }
            console.log("RECEIVED FOLLOWING RESULTS: ", action.following);
            break;
        case "RECEIVE COMMENTS":
            console.log("RECEIVED COMMENTS:", action.comments);
            new_state.posts[action.postId].comments = action.comments;
            break;
        case "NEW COMMENT":
            console.log("RECEIVED NEW COMMENT: ", action.data);
            new_state.commentContent = "";
            new_state.posts[action.data.post].comments.push(action.data);
            console.log("new_state: ", new_state);
            break;
        case "RECEIVE USER IMAGE":
            new_state.userImages[action.username] = action.img;
            // console.log("RECEVED USER IMAGE:", new_state);
            break;
        case "CHANGE COMMENT CONTENT":
            new_state.commentContent = action.commentContent;
            break;
        case "SHOW MODAL":
            // console.log("SHOWING MODAL: ", action.text);
            new_state.modal = action.text;
            break;
        case "HIDE MODAL":
            new_state.modal = "";
            break;
        default:
            new_state.currentUser = {pic: "", info: ""};
            new_state.newCommentOk = false;
            new_state.userImages = {};
            new_state.posts = {};
            new_state.searchResults = [];
            new_state.following = [];
            new_state.userFollowed = {};
            break;
    }

    return new_state;
}

export default (history) => combineReducers(
    {
        router: connectRouter(history), main: reducer
    }
);


