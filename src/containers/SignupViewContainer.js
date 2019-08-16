import {connect} from "react-redux";
import SignupViewComponent from "../components/SignupViewComponent";
import {signup} from "../actions";

const mapDispatchToProps = dispatch => ({
    signup: (data) => {
        dispatch(signup(data));
    }
});

export default connect(null, mapDispatchToProps)(SignupViewComponent);
