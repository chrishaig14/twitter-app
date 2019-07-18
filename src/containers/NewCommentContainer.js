import {connect} from "react-redux";
import NewCommentComponent from "../components/NewCommentComponent";
import {submitNewComment} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.data.id,
        data: ownProps.data
    };
};

const mapDispatchToProps = dispatch => ({
    submit: (data) => {
        console.log("DISPATCHING NEW COMMENT: ", data);
        dispatch(submitNewComment(data));
    }
});

export default connect(null, mapDispatchToProps)(NewCommentComponent);