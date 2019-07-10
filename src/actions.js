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
        fetch(serverUrl + "/feed",
            {
                method: "GET",
                headers: {"Authorization": "user1"}
            }
        ).then(res => res.json()
        ).then(
            res => {
                dispatch(receiveFeed(res));
            });
    };
};