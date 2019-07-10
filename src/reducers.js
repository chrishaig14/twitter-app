import {applyMiddleware as dispatch} from "redux";

const serverUrl = "http://localhost:8888";

export default function (state = {}, action) {
    console.log("REDUCER CALLED WITH ACTION: ", action);
    let new_state = Object.assign({}, state);
    switch (action.type) {
        case "REQUEST FEED":
            break;
        case "RECEIVE FEED":
            new_state.postList = action.data.posts;
            break;
        default:
            new_state.postList = [];
            break;
    }

    return new_state;
}