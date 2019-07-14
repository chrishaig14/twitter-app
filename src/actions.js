import {push} from "connected-react-router";

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
        // console.log("GET FEED WITH TOKEN: ", getState().reducer.token);
        dispatch(requestFeed());
        let h = {"Authorization": getState().main.token};
        // console.log("H::::", h);
        fetch(serverUrl + "/feed",
            {
                method: "GET",
                headers: h
            }
        ).then(res => res.json()
        ).then(
            res => {
                // console.log("RECEIVED FEED DATA: ", res);
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
                dispatch(push("/feed"));
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
    fetch(this.serverUrl + "/users/" + this.username, {
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

export const fetchUserPosts = (username) => {
    return (dispatch) => {
        fetch(serverUrl + "/users/" + username + "/posts", {
            method: "GET"
        }).then(
            res => res.json()
        ).then(
            res => {
                console.log(`GOT USER ${username} POSTS:`, res);
                dispatch(receiveFeed({posts: res}));
            }
        );
    };
};

const setUserFollowed = followed => ({
    type: "SET FOLLOWED",
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
                    dispatch(setUserFollowed(true));
                } else {
                    dispatch(setUserFollowed(false));
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
                    dispatch(setUserFollowed(true));

                }
            }
        );
    };
};

export const logout = () => {
    return (dispatch, getState) => {

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
                    dispatch(setUserFollowed(false));
                }
            }
        );
    };
};
