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
        console.log("DISPATCHING NEW COMMENT");
        dispatch(submitNewComment(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentComponent);