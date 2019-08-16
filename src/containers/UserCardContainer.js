import {connect} from "react-redux";
import UserCardComponent from "../components/UserCardComponent";
import {checkFollowed, follow, unfollow} from "../actions";

const mapStateToProps = (state, ownProps) => ({
    username: ownProps.username,
    followed: state.main.userFollowed ? state.main.userFollowed[ownProps.username] : false
});

const mapDispatchToProps = dispatch => ({
    onMount: (id) => {
        dispatch(checkFollowed(id));
    },
    follow: (id) => {
        dispatch(follow(id));
    },
    unfollow: (id) => {
        dispatch(unfollow(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCardComponent);
