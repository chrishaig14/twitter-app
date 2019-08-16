import {connect} from "react-redux";
import {fetchLogin} from "../actions";
import LoginViewComponent from "../components/LoginViewComponent";

const mapStateToProps = state => {
    return ({
        error: state.main.loginError
    });
};

const mapDispatchToProps = dispatch => ({
    onSubmit: (username, password) => {
        dispatch(fetchLogin(username, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewComponent);
