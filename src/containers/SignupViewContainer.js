import {connect} from "react-redux";
import SignupViewComponent from "../components/SignupViewComponent";
import {signup} from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => ({
    signup: (data) => {
        console.log("DISPATCHING SIGNUP");
        dispatch(signup(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupViewComponent);