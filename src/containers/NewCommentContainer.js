import {connect} from "react-redux";
import NewCommentComponent from "../components/NewCommentComponent";
import {changeCommentContent, submitNewComment} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        content: state.main.commentContent[ownProps.postId]
    };
};

const mapDispatchToProps = dispatch => ({
    submit: (data) => {
        console.log("DISPATCHING NEW COMMENT: ", data);
        dispatch(submitNewComment(data));
    },
    onInputChange: (postId, value) => {
        dispatch(changeCommentContent(postId, value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentComponent);
