import {connect} from "react-redux";
import PostComponent from "../components/PostComponent";
import {fetchPostComments, quote, sharePost} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.data.id,
        data: ownProps.data
    };
};

const mapDispatchToProps = dispatch => ({
    fetchComments: (postId) => {
        dispatch(fetchPostComments(postId));
    },
    share: (postId) => {
        // console.log("SHARNI POST!");
        dispatch(sharePost(postId));
    },
    quote: (postId, quoteContent) => {
        dispatch(quote(postId, quoteContent));
    }
});

export default connect(null, mapDispatchToProps)(PostComponent);