import UserViewComponent from "../components/UserViewComponent";
import {connect} from "react-redux";
import {checkFollowed, fetchUserPosts, follow, unfollow} from "../actions";
import {selectUserPosts} from "../selectors";

const mapStateToProps = (state, ownProps) => {
    let username = ownProps.match.params.id;
    return ({
        username: username,
        posts: selectUserPosts(state, username),
        followed: state.main.userFollowed[ownProps.match.params.id]
    });
};
const mapDispatchToProps = dispatch => {
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
