import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import Cookies from 'js-cookie'
function reducer(state = {}, action) {
    console.log("REDUCER CALLED WITH ACTION: ", action, "AND STATE IS: ", state);
    let new_state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "REQUEST FEED":
            break;
        case "RECEIVE FEED": {
            let postList = {};
            for (let post of action.data.posts) {
                post.comments = [];
                postList[post.id] = post;
            }
            new_state.posts = postList;
        }
            break;
        case "RECEIVE USER POSTS": {
            let postList = {};
            for (let post of action.data) {
                post.comments = [];
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
            new_state.posts[post.id] = post;
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
        default:
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


