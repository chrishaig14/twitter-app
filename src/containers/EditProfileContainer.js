import {connect} from "react-redux";
import EditProfile from "../components/EditProfile";
import {userImageSelect, userInfoChange, userInfoSave} from "../actions";

const mapStateToProps = state => {
    return state.main.currentUser;
};

const mapDispatchToProps = dispatch => ({
    onImageSelect: (pic) => {
        dispatch(userImageSelect(pic));
    },
    onInfoChange: (info) => {
        dispatch(userInfoChange(info));
    },
    onInfoSave: () => {
        dispatch(userInfoSave());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
