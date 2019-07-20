import HeaderComponent from "../components/HeaderComponent";
import {connect} from "react-redux";
import {logout} from "../actions";

const mapStateToProps = state => ({
    username: state.main.token
});

const mapDispatchToProps = dispatch => ({
    onLogout: () => {
        dispatch(logout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);