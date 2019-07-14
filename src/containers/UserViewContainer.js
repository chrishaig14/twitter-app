import UserViewComponent from "../components/UserViewComponent";
import {connect} from "react-redux";
import {checkFollowed, fetchUserPosts, follow, unfollow} from "../actions";

const mapStateToProps = (state, ownProps) => {
    console.log("STATE NEW: ", state);
    return ({
        username: ownProps.match.params.id,
        posts: state.main.postList,
        followed: state.main.userFollowed
    });
};
const mapDispatchToProps = dispatch => {
    console.log("MAPPING DISPATH");
    return ({
        follow: (id) => dispatch(follow(id)),
        unfollow: (id) => dispatch(unfollow(id)),
        onMount: (id) => {
            dispatch(checkFollowed(id));
            dispatch(fetchUserPosts(id));
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(UserViewComponent);