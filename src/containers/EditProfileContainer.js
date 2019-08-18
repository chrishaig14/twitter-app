import {connect} from "react-redux";
import EditProfile from "../components/EditProfile";
import {userInfoSave} from "../actions";

const mapStateToProps = state => {
    return {
        username: state.main.currentUser,
        pic: state.main.userImages[state.main.currentUser]
    };
};

const mapDispatchToProps = dispatch => ({
    onInfoSave: (pic, info) => {
        dispatch(userInfoSave(pic, info));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
