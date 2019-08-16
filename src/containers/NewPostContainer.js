import NewPostComponent from "../components/NewPostComponent";
import {connect} from "react-redux";
import {newPost} from "../actions";

const mapDispatchToProps = dispatch => ({
    onSubmit: (postContent) => {
        dispatch(newPost(postContent));
    }
});

export default connect(null, mapDispatchToProps)(NewPostComponent);
