import { connect } from "react-redux";
import { fetchLogin, login } from "../actions";
import LoginViewComponent from "../components/LoginViewComponent";

const mapStateToProps = state => ({
    error: state.loginError,
    redirect: state.redirect
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (username, password) => {
        console.log("DISPATCHING FETCH FEED");
        dispatch(fetchLogin(username, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewComponent);