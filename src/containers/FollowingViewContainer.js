import {connect} from "react-redux";
import FollowingViewComponent from "../components/FollowingViewComponent";
import {fetchFollowing} from "../actions";

const mapStateToProps = state => {
    console.log("STATE:", state);
    let users = [];
    for (let user in state.main.userFollowed) {
        if (state.main.userFollowed[user]) {
            users.push(user);
        }
    }
    return {
        users: users
    };
};

const mapDispatchToProps = dispatch => ({
    onMount: () => {
        dispatch(fetchFollowing());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowingViewComponent);