import {connect} from "react-redux";
import PostComponent from "../components/PostComponent";
import {fetchPostComments} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.data.id,
        data: ownProps.data
    };
};

const mapDispatchToProps = dispatch => ({
    fetchComments: (postId) => {
        dispatch(fetchPostComments(postId));
    }
});

export default connect(null, mapDispatchToProps)(PostComponent);