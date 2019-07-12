import NewPostComponent from "../components/NewPostComponent";
import {connect} from "react-redux";
import {newPost} from "../actions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onSubmit: (postContent) => {
        dispatch(newPost(postContent));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostComponent);