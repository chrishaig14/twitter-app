import UserViewComponent from "../components/UserViewComponent";
import {connect} from "react-redux";
import {checkFollowed, fetchUserPosts, follow, unfollow} from "../actions";

const mapStateToProps = (state, ownProps) => {
    let posts = [];
    for (const postId in state.main.posts) {
        posts.push(state.main.posts[postId]);
    }
    return ({
        username: ownProps.match.params.id,
        posts: posts,
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