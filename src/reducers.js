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
    state.newPostContent = "";
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
    return state;
}

function receive_comments(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.posts[action.postId].comments = action.comments;
    return state;
}


function new_comment(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.posts[action.data.post].comments.push(action.data);
    state.commentContent[action.data.post] = "";
    return state;
}

function receive_user_image(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.userImages[action.username] = action.img;
    return state;
}

function change_comment_content(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
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

function new_post_content_change(old_state, action) {
    let state = JSON.parse(JSON.stringify(old_state));
    state.newPostContent = action.content;
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
    map["NEW POST CONTENT CHANGE"] = new_post_content_change;
    if (map.hasOwnProperty(action.type)) {
        state = map[action.type](old_state, action);
    }
    return state;
}

export default (history) => combineReducers(
    {
        router: connectRouter(history), main: reducer
    }
);


