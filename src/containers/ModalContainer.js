import {connect} from "react-redux";
import ModalComponent from "../components/ModalComponent";
import {hideModal} from "../actions";

const mapStateToProps = state => {

    return {text: state.main.modal};
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);