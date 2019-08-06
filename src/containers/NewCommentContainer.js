import {connect} from "react-redux";
import NewCommentComponent from "../components/NewCommentComponent";
import {changeCommentContent, submitNewComment} from "../actions";

const mapStateToProps = (state, ownProps) => {
    // console.log("new comment ok: ", state.main.newCommentOk);
    return {
        // id: ownProps.data.id,
        // data: ownProps.data,
        content: state.main.commentContent
    };
};

const mapDispatchToProps = dispatch => ({
    submit: (data) => {
        console.log("DISPATCHING NEW COMMENT: ", data);
        dispatch(submitNewComment(data));
    },
    onInputChange: (e) => {
        dispatch(changeCommentContent(e.target.value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentComponent);