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