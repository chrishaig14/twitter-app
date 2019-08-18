import {replace} from "connected-react-router";
import Cookies from "js-cookie";

// const serverUrl = "http://localhost:8888";
const serverUrl = "https://chris-twitter-server.herokuapp.com";
export const requestFeed = () => ({
    type: "REQUEST FEED"
});

export const receiveFeed = (data) => ({
    type: "RECEIVE FEED",
    data: data
});

export const fetchFeed = () => {
    return async (dispatch, getState) => {
        dispatch(requestFeed());
        try {
            let h = {"Authorization": getState().main.token};
            let res = await fetch(serverUrl + "/feed",
                {
                    method: "GET",
                    headers: h
                }
            );
            res = await res.json();
            dispatch(receiveFeed(res));
        } catch (e) {
            console.log("ERROR: ", e);
        }

    };
};

export const login = (username, password) => (
    {type: "SEND LOGIN", username, password}
);

export const receiveToken = (token) => ({
    type: "RECEIVE TOKEN", token
});

export const loginError = (error) => ({
    type: "LOGIN ERROR", loginError: error
});

export const fetchLogin = (username, password) => {
    return async (dispatch, getState) => {
        dispatch(login(username, password));

        let res = await fetch(serverUrl + "/login",
            {
                method: "POST",
                body: JSON.stringify({username, password})
            }
        );
        if (res.ok) {
            dispatch(receiveToken(res.headers.get("Authorization")));
            dispatch(replace("/feed"));
        } else {
            dispatch(loginError("ERROR"));
        }

    };
};

const receiveNewPost = postData => (
    {
        type: "RECEIVE NEW POST",
        postData
    }
);

export const newPostContentChange = content => ({
    type: "NEW POST CONTENT CHANGE",
    content
});

export const sendNewPost = () => {
    return async (dispatch, getState) => {
        let res = await fetch(serverUrl + "/posts",
            {
                method: "POST",
                body: JSON.stringify({content: getState().main.newPostContent}),
                headers: {"Authorization": getState().main.token}
            }
        );
        if (res.ok) {
            res = await res.json();
            dispatch(receiveNewPost(res));
            dispatch(showModal("POSTED OK!"));
        }
    };
};

export const followUser = (id) => {
    return async (dispatch, getState) => {
        let res = await fetch(serverUrl + "/users/me/followees/" + id,
            {
                method: "PUT",
                headers: {"Authorization": getState().main.token}
            }
        );
        if (res.ok) {
            await res.json();
            dispatch({type: "OK"});
        }

    };
};

export const fetchUser = () => {
    console.log("SENDING REQUEST TO GET USER POSTS");
    fetch(serverUrl + "/users/" + this.username, {
        method: "GET"
    }).then(
        res => res.json()
    ).then(
        res => {
            console.log(`GOT USER ${this.username} POSTS:`, res);
            this.setState({"pic": res.pic});
        }
    );
};

export const receiveUserPosts = (data) => ({
    type: "RECEIVE USER POSTS",
    data: data
});

export const fetchUserPosts = (username) => {
    return async (dispatch) => {
        let res = await fetch(serverUrl + "/users/" + username + "/posts", {
            method: "GET"
        });
        res = await res.json();

        dispatch(receiveUserPosts(res));
    };
};

const setUserFollowed = (username, followed) => ({
    type: "SET FOLLOWED",
    username: username,
    followed: followed
});

export const checkFollowed = (username) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/users/me/followees/" + username, {
            method: "GET", headers: {"Authorization": getState().main.token}
        }).then(
            res => {
                if (res.status === 200) {
                    dispatch(setUserFollowed(username, true));
                } else {
                    dispatch(setUserFollowed(username, false));
                }
            }
        );
    };
};

export const follow = (username) => {
    return async (dispatch, getState) => {
        let res = await fetch(serverUrl + "/users/me/followees/" + username, {
            method: "PUT", headers: {"Authorization": getState().main.token}
        });
        if (res.ok) {
            dispatch(setUserFollowed(username, true));

        }
    };
};

export const logout = () => {
    return (dispatch, getState) => {
        Cookies.remove("token");
        dispatch(replace("/"));
    };
};

export const unfollow = (username) => {
    return async (dispatch, getState) => {
        let res = await fetch(serverUrl + "/users/me/followees/" + username, {
            method: "DELETE", headers: {"Authorization": getState().main.token}
        });
        if (res.ok) {
            dispatch(setUserFollowed(username, false));
        }

    };
};

export const receiveSearch = data => ({
    type: "RECEIVE SEARCH",
    data: data
});

export const fetchSearch = (query) => {
    return async (dispatch, getState) => {
        let url = serverUrl + "/search" + query;
        let res = await fetch(url, {method: "GET"});
        res = await res.json();
        dispatch(receiveSearch(res.map(a => a.username)));
    };
};

export const receiveFollowing = (following) => ({
    type: "RECEIVE FOLLOWING",
    following
});

export const fetchFollowing = () => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/users/me/followees", {
            method: "GET",
            headers: {"Authorization": getState().main.token}
        }).then(
            res => res.json()
        ).then(
            res => {
                dispatch(receiveFollowing(res));
            }
        );
    };
};

const receiveSharedPost = post_id => ({
    type: "RECEIVE SHARED POST",
    postId: post_id
});

const showModal = text => ({
    type: "SHOW MODAL",
    text: text
});

export const hideModal = () => ({
    type: "HIDE MODAL"
});

export const sharePost = (postId) => {
    return async (dispatch, getState) => {
        let res = await fetch(serverUrl + "/shares",
            {
                method: "POST",
                headers: {"Authorization": getState().main.token},
                body: JSON.stringify({post_id: postId})
            }
        );

        if (res.ok) {
            dispatch(receiveSharedPost(postId));
            dispatch(showModal("SHARED POST!"));
        } else {
            dispatch(showModal("COULD NOT SHARE POST!"));
        }
    };
};

export const quote = (postId, quoteContent) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/posts",
            {
                method: "POST",
                headers: {"Authorization": getState().main.token},
                body: JSON.stringify({content: quoteContent, retweet: postId})
            }
        ).then(
            res => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch(showModal("ERROR!"));
                }
            }
        ).then(
            res => {
                dispatch(receiveNewPost(res));
                dispatch(showModal("QUOTED POST!"));
            }
        );
    };
};

const receiveNewComment = (data) => ({
    type: "NEW COMMENT",
    data: data
});

export const submitNewComment = (postId) => {
    return (dispatch, getState) => {
        let data = getState().main.commentContent[postId];
        fetch(serverUrl + "/posts/" + postId + "/comments", {
            method: "POST",
            body: JSON.stringify({content: data, parent: -1}),
            headers: {"Authorization": getState().main.token}
        }).then(
            res => res.json()
        ).then(
            res => {
                dispatch(receiveNewComment(res));
            }
        );
    };
};

const userImageChangeOk = (img) => ({
    type: "USER IMAGE CHANGE OK",
    img: img
});

export const updateImage = (result) => {
    return async (dispatch, getState) => {
        try {
            let res = await fetch(serverUrl + "/users/me/img", {
                method: "PUT",
                headers: {
                    "Authorization": getState().main.token
                },
                body: result
            });
            if (res.ok) {
                dispatch(userImageChangeOk(result));
                dispatch(showModal("IMAGE UPDATED!"));
            } else {
                dispatch(showModal("COULD NOT UPDATE IMAGE!"));
            }
        } catch (e) {
            console.log("THERE WAS AN ERROR:", e);
        }

    };
};

export const receivePostComments = (postId, res) => ({
    type: "RECEIVE COMMENTS",
    postId: postId,
    comments: res
});

export const fetchPostComments = (postId) => {
    return async (dispatch, getState) => {
        let res = await fetch(serverUrl + "/posts/" + postId + "/comments", {
            method: "GET"
        });
        res = await res.json();
        dispatch(receivePostComments(postId, res));
    };
};

const receiveUserImage = (username, img) => ({
    type: "RECEIVE USER IMAGE",
    username,
    img
});

export const getUserImage = (username) => {
    return async (dispatch, getState) => {
        if (getState().main.userImages.hasOwnProperty(username)) {
            return;
        }
        let url = serverUrl + "/users/" + username + "/img";
        let res = await fetch(url, {
            method: "GET"
        });
        res = await res.text();
        dispatch(receiveUserImage(username, res));
    };
};

export const signup = (data) => {
    return async (dispatch, getState) => {
        console.log(`Signing up username=${data.username} password=${data.password} confirmPassword=${data.confirmPassword}`);
        try {
            let res = await fetch(serverUrl + "/users", {
                method: "POST",
                body: JSON.stringify({username: data.username, password: data.password})
            });
            if (res.ok) {
                dispatch(showModal("USER CREATED!"));
                dispatch(replace("/"));
            } else {
                dispatch(showModal("ERROR SIGNING UP!"));
            }
        } catch (e) {
            console.log("ERRRRRRRRRRRRROR: ", e);
        }
    };
};

export const getUserInfo = (username) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/users/me", {
            method: "GET",
            headers: {"Authorization": getState().main.token}
        }).then(
            res => {
                if (res.ok) {
                    return res.json();
                }
            }
        ).then(
            res => {
                console.log("GOT USER INFO OK!");
            }
        );
    };
};

export const changeCommentContent = (postId, content) => ({
    type: "CHANGE COMMENT CONTENT",
    postId: postId,
    commentContent: content
});

export const userImageSelect = (pic) => ({
    type: "USER IMAGE SELECT",
    pic: pic
});

export const userInfoChange = (info) => ({
    type: "USER INFO CHANGE",
    info: info
});

export const userInfoSave = (pic, info) => {
    return (dispatch, getState) => {
        dispatch(updateImage(pic));
        dispatch(replace("/feed"));
    };
};
