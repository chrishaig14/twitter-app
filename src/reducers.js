import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

function reducer(state = {}, action) {
    console.log("REDUCER CALLED WITH ACTION: ", action);
    let new_state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case "REQUEST FEED":
            break;
        case "RECEIVE FEED":
            new_state.postList = action.data.posts;
            break;
        case "RECEIVE TOKEN":
            new_state.token = action.token;
            console.log("RECEIVED TOKEN: "
                , new_state.token);
            console.log(new_state);
            break;
        case "LOGIN ERROR":
            new_state.loginError = action.loginError;
            console.log("LOGIN ERROR", action.loginError);
            break;
        case "RECEIVE NEW POST":
            console.log("RECEIVED NEW POST");
            new_state.postList.unshift(action.postData);
            console.log("NEW POST LIST: ", new_state.postList);
            break;
        case "SET FOLLOWED":
            new_state.userFollowed = action.followed;
            break;
        case "RECEIVE SEARCH":
            new_state.searchResults = action.data;
            console.log("RECEIVED SEARCH RESULTS: ", action.data);
            break;
        default:
            new_state.postList = [];
            new_state.searchResults = [];
            break;
    }

    return new_state;
}

export default (history) => combineReducers(
    {
        router: connectRouter(history), main: reducer
    }
);

