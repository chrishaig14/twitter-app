import {connect} from "react-redux";
import PostComponent from "../components/PostComponent";
import {onSubmitRetweet, sharePost} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.data.id,
        data: ownProps.data
    };
};

const mapDispatchToProps = dispatch => ({
    share: (postId) => {
        console.log("DISPATCHING POST SHARE");
        dispatch(sharePost(postId));
    },
    retweet: (data) => {
        dispatch(onSubmitRetweet(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PostComponent);