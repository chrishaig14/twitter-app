import {connect} from "react-redux";
import NewCommentComponent from "../components/NewCommentComponent";
import {changeCommentContent, submitNewComment} from "../actions";

const mapStateToProps = (state) => {
    return {
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
