import {push, replace} from "connected-react-router";
import {parse} from "query-string";
import Cookies from "js-cookie";

const serverUrl = "http://localhost:8888";

export const requestFeed = () => ({
    type: "REQUEST FEED"
});

export const receiveFeed = (data) => ({
    type: "RECEIVE FEED",
    data: data
});

export const fetchFeed = () => {
    return (dispatch, getState) => {
        dispatch(requestFeed());
        let h = {"Authorization": getState().main.token};
        fetch(serverUrl + "/feed",
            {
                method: "GET",
                headers: h
            }
        ).then(res => res.json()
        ).then(
            res => {

                console.log("RECEIVED FEED DATA: ", res);
                dispatch(receiveFeed(res));
            });
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
    return (dispatch, getState) => {
        dispatch(login(username, password));
        fetch(serverUrl + "/login",
            {
                method: "POST",
                body: JSON.stringify({username, password})
            }
        ).then(res => {
            if (res.ok) {
                dispatch(receiveToken(res.headers.get("Authorization")));
                dispatch(replace("/feed"));
            } else {
                dispatch(loginError("ERROR"));
            }
        });
    };
};

const receiveNewPost = postData => (
    {
        type: "RECEIVE NEW POST",
        postData
    }
);

export const newPost = (postContent) => {
    return (dispatch, getState) => {
        // dispatch()
        fetch(serverUrl + "/posts",
            {
                method: "POST",
                body: JSON.stringify({content: postContent}),
                headers: {"Authorization": getState().main.token}
            }
        )
            .then(
                res => {
                    if (res.ok) {
                        return res.json();
                    }
                }
            ).then(
            res => {
                dispatch(receiveNewPost(res));
            }
        );
    };
};

export const followUser = (id) => {
    return (dispatch, getState) => {
        // dispatch()
        fetch(serverUrl + "/users/me/followees/" + id,
            {
                method: "PUT",
                headers: {"Authorization": getState().main.token}
            }
        )
            .then(
                res => {
                    if (res.ok) {
                        return res.json();
                    }
                }
            ).then(
            res => {
                dispatch({type: "OK"});
            }
        );
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
    return (dispatch) => {
        fetch(serverUrl + "/users/" + username + "/posts", {
            method: "GET"
        }).then(
            res => res.json()
        ).then(
            res => {
                console.log(`GOT USER ${username} POSTS:`, res);
                dispatch(receiveUserPosts(res));
            }
        );
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
                console.log("RES.STATUS: ", res.status);
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
    return (dispatch, getState) => {
        fetch(serverUrl + "/users/me/followees/" + username, {
            method: "PUT", headers: {"Authorization": getState().main.token}
        }).then(
            res => {
                if (res.ok) {
                    console.log("NOW FOLLOWING USER: ", username);
                    // this.setState({followed: true});
                    dispatch(setUserFollowed(username, true));

                }
            }
        );
    };
};

export const logout = () => {
    return (dispatch, getState) => {
        console.log("LOGGING OUT!");
        Cookies.remove("token");
        dispatch(replace("/"));
    };
};

export const unfollow = (username) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/users/me/followees/" + username, {
            method: "DELETE", headers: {"Authorization": getState().main.token}
        }).then(
            res => {
                if (res.ok) {
                    console.log("STOPPED FOLLOWING USER: ", username);
                    // this.setState({followed: false});
                    dispatch(setUserFollowed(username, false));
                }
            }
        );
    };
};

export const receiveSearch = data => ({
    type: "RECEIVE SEARCH",
    data: data
});

export const fetchSearch = (query) => {
    return (dispatch, getState) => {
        let url = serverUrl + "/search" + query;
        fetch(url, {method: "GET"}).then(
            res => {
                return res.json();
            }
        ).then(res => {
            dispatch(receiveSearch(res.map(a => a.username)));
        });
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
                dispatch(receiveFollowing(res.map(x => x.followee)));
            }
        );
    };
};

export const sharePost = (postId) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/shares",
            {
                method: "POST",
                headers: {"Authorization": getState().main.token},
                body: JSON.stringify({post_id: postId})
            }
        ).then(
            res => {
                if (res.ok) {
                    console.log("SHARED POST OK!");
                } else {
                    console.log("COULD NOT SHARE POST!");
                }
            }
        );
    };
};

export const onSubmitRetweet = (data) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/posts",
            {
                method: "POST",
                headers: {"Authorization": getState().main.token},
                body: JSON.stringify({content: data.retweetValue, retweet: data.id})
            }
        ).then(
            res => {
                if (res.ok) {
                    console.log("RETWEETED OK!");
                } else {
                    console.log("COULD NOT RETWEET!");
                }
            }
        );
    };
};

const receiveNewComment = (data) => ({
    type: "NEW COMMENT",
    data: data
});

export const submitNewComment = (data) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/posts/" + data.postId + "/comments", {
            method: "POST",
            body: JSON.stringify({content: data.comment, parent: -1}),
            headers: {"Authorization": getState().main.token}
        }).then(
            res => res.json()
        ).then(
            res => {
                // this.props.onSubmit(res);
                dispatch(receiveNewComment(res));
                console.log("NEW COMMENT POSTED: ", res);
            }
        );
    };
};

export const updateImage = (result) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/users/me/img", {
            method: "PUT",
            headers: {
                "Authorization": getState().main.token
            },
            body: result
        }).then(
            res => {
                if (res.ok) {
                    console.log("UPDATED IMAGE OK!");
                } else {
                    console.log("COULD NOT UPDATE IMAGE!");
                }
            }
        );
    };
};

export const receivePostComments = (postId, res) => ({
    type: "RECEIVE COMMENTS",
    postId: postId,
    comments: res
});

export const fetchPostComments = (postId) => {
    return (dispatch, getState) => {
        fetch(serverUrl + "/posts/" + postId + "/comments", {
            method: "GET"
        }).then(res => res.json()).then(
            res => {
                // this.setState({commentSection: true, comments: res});
                // console.log("RECEIVED POST COMMENTS: ", res)
                dispatch(receivePostComments(postId, res));
            }
        );
    };
};

export const getUserImage = (username) => {
    return (dispatch, getState) => {
        let url = serverUrl + "/users/" + username + "/img";
        fetch(url, {
            method: "GET"
        }).then(
            res => {
                return res.text();
            }
        ).then(
            res => {
                console.log("RECEIVED USER IMAGE ", username);
            }
        );
    };
};

export const signup = (data) => {
    return (dispatch, getState) => {
        console.log(`Signing up username=${data.username} password=${data.password} confirmPassword=${data.confirmPassword}`);
        fetch(serverUrl + "/users", {
            method: "POST",
            body: JSON.stringify({username: data.username, password: data.password})
        }).then(
            res => {
                if (res.ok) {
                    console.log("SIGNUP OK!");
                } else {
                    console.log("ERROR SIGNING UP!");
                }
            }
        ).catch(e => {
            console.log("ERRRRRRRRRRRRROR: ", e);
        });
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