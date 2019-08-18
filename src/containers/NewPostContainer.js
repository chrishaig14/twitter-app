import NewPostComponent from "../components/NewPostComponent";
import {connect} from "react-redux";
import {newPostContentChange, sendNewPost} from "../actions";

const mapStateToProps = state => (
    {content: state.main.newPostContent}
);

const mapDispatchToProps = dispatch => ({
    onSubmit: () => {
        dispatch(sendNewPost());
    },
    onContentChange: (content) => {
        dispatch(newPostContentChange(content));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostComponent);
