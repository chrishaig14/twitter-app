import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import Cookies from "js-cookie";

function request_feed(old_state = {}, action) {
    return old_state;
}

function receive_feed(old_state = {}, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    let postList = {};
    console.log("COMMENT CONTENT: ", state.commentContent);

    for (let post of action.data.posts) {
        console.log("POST.ID: ", post.id);
        post.comments = [];
        postList[post.id] = post;
        state.commentContent[post.id] = "";
    }
    state.posts = postList;
    return state;
}

function user_image_select(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    // state.currentUser.pic = action.pic;
    state.currentUserTempImage = action.pic;
    console.log("UPDATING USER IMAGE!");
    return state;
}

function user_info_change(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.currentUser.info = action.info;
    return state;
}

function receive_user_posts(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    let postList = {};
    for (let post of action.data.posts) {
        post.comments = [];
        postList[post.id] = post;
        state.commentContent[post.id] = "";
    }
    state.posts = postList;
    return state;
}

function receive_token(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.token = action.token;
    state.currentUser = action.token;
    Cookies.set("token", action.token);
    return state;
}

function login_error(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.loginError = action.loginError;
    return state;
}

function receive_new_post(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    let post = action.postData;
    post.comments = [];
    state.commentContent[post.id] = "";
    state.posts[post.id] = post;
    return state;
}

function receive_shared_post(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.posts[action.postId].shares.push(state.token);
    return state;
}

function set_followed(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.userFollowed[action.username] = action.followed;
    return state;
}

function receive_search(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.searchResults = action.data;
    return state;
}

function receive_following(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));

    for (let username of action.following) {
        state.userFollowed[username] = true;
    }
    console.log("RECEIVED FOLLOWING RESULTS: ", action.following);
    return state;
}

function receive_comments(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    console.log("RECEIVED COMMENTS:", action.comments);
    state.posts[action.postId].comments = action.comments;
    return state;
}


function new_comment(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    console.log("RECEIVED NEW COMMENT: ", action.data);
    // state.commentContent = "";
    state.posts[action.data.post].comments.push(action.data);
    state.commentContent[action.data.post] = "";
    console.log("new_state: ", state);
    return state;
}

function receive_user_image(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.userImages[action.username] = action.img;
    return state;
}

function change_comment_content(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    console.log("ACTION : ", action);
    state.commentContent[action.postId] = action.commentContent;
    return state;
}

function show_modal(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.modal = action.text;
    return state;
}

function hide_modal(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.modal = "";
    return state;
}

function user_image_change_ok(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.userImages[state.currentUser] = action.img;
    return state;
}

function reducer(old_state = {}, action) {
    let state = old_state;
    let map = {};

    map["REQUEST FEED"] = request_feed;

    map["RECEIVE FEED"] = receive_feed;

    map["USER IMAGE SELECT"] = user_image_select;
    map["USER IMAGE CHANGE OK"] = user_image_change_ok;

    map["USER INFO CHANGE"] = user_info_change;

    map["RECEIVE USER POSTS"] = receive_user_posts;

    map["RECEIVE TOKEN"] = receive_token;

    map["LOGIN ERROR"] = login_error;

    map["RECEIVE NEW POST"] = receive_new_post;

    map["RECEIVE SHARED POST"] = receive_shared_post;

    map["SET FOLLOWED"] = set_followed;

    map["RECEIVE SEARCH"] = receive_search;

    map["RECEIVE FOLLOWING"] = receive_following;

    map["RECEIVE COMMENTS"] = receive_comments;

    map["NEW COMMENT"] = new_comment;

    map["RECEIVE USER IMAGE"] = receive_user_image;

    map["CHANGE COMMENT CONTENT"] = change_comment_content;

    map["SHOW MODAL"] = show_modal;

    map["HIDE MODAL"] = hide_modal;

    // switch (action.type) {
    //     case "REQUEST FEED":
    //         state = request_feed(old_state, action);
    //         break;
    //     case "RECEIVE FEED":
    //         state = receive_feed(old_state, action);
    //         break;
    //     case "USER IMAGE SELECT":
    //         state = user_image_select(old_state, action);
    //         break;
    //     case "USER INFO CHANGE":
    //         state = user_info_change(old_state, action);
    //         break;
    //     case "RECEIVE USER POSTS":
    //         state = receive_user_posts(old_state, action);
    //         break;
    //     case "RECEIVE TOKEN":
    //         state = receive_token(old_state, action);
    //         break;
    //     case "LOGIN ERROR":
    //         state = login_error(old_state, action);
    //         break;
    //     case "RECEIVE NEW POST":
    //         state = receive_new_post(old_state, action);
    //         break;
    //     case "RECEIVE SHARED POST":
    //         state = receive_shared_post(old_state, action);
    //         break;
    //     case "SET FOLLOWED":
    //         state = set_followed(old_state, action);
    //         break;
    //     case "RECEIVE SEARCH":
    //         state = receive_search(old_state, action);
    //         break;
    //     case "RECEIVE FOLLOWING":
    //         state = receive_following(old_state, action);
    //         break;
    //     case "RECEIVE COMMENTS":
    //         state = receive_comments(old_state, action);
    //         break;
    //     case "NEW COMMENT":
    //         state = new_comment(old_state, action);
    //         break;
    //     case "RECEIVE USER IMAGE":
    //         state = receive_user_image(old_state, action);
    //         break;
    //     case "CHANGE COMMENT CONTENT":
    //         state = change_comment_content(old_state, action);
    //         break;
    //     case "SHOW MODAL":
    //         state = show_modal(old_state, action);
    //         break;
    //     case "HIDE MODAL":
    //         state = hide_modal(old_state, action);
    //         break;
    //     default:
    //         state.currentUser = {pic: "", info: ""};
    //         state.newCommentOk = false;
    //         state.userImages = {};
    //         state.posts = {};
    //         state.searchResults = [];
    //         state.following = [];
    //         state.userFollowed = {};
    //         break;
    // }
    console.log("RECEIVED ACTION: ", action);
    if (map.hasOwnProperty(action.type)) {
        state = map[action.type](old_state, action);
    }
    // console.log(state)
    return state;
}

export default (history) => combineReducers(
    {
        router: connectRouter(history), main: reducer
    }
);


