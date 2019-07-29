import React, {Component} from "react";

class ModalComponent extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.text !== "") {
            setTimeout(this.props.hideModal, 1000);
        }
    }

    render() {
        return (
            <div className={this.props.text ? "modal-show" : "modal-hide"} onClick={this.props.hideModal}>
                <div className={"modal-content"}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default ModalComponent;