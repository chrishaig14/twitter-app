import {connect} from "react-redux";
import PostComponent from "../components/PostComponent";
import {fetchPostComments, quote, sharePost} from "../actions";

const mapDispatchToProps = dispatch => ({
    fetchComments: (postId) => {
        dispatch(fetchPostComments(postId));
    },
    share: (postId) => {
        dispatch(sharePost(postId));
    },
    quote: (postId, quoteContent) => {
        dispatch(quote(postId, quoteContent));
    }
});

export default connect(null, mapDispatchToProps)(PostComponent);
