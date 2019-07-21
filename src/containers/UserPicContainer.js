import {connect} from "react-redux";
import UserPicComponent from "../components/UserPicComponent";
import {getUserImage} from "../actions";

const mapStateToProps = (state, ownProps) => {
    console.log("USER IMAGE FOR USER: ", ownProps.username);
    return {
        img: state.main.userImages[ownProps.username]
    };
};

const mapDispatchToProps = dispatch => ({
    onMount: (username) => {
        dispatch(getUserImage(username));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPicComponent);