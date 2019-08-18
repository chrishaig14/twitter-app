import React from "react";

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.onImageSelect = this.onImageSelect.bind(this);
        this.state = {pic: this.props.pic};
    }


    encodeImageFileAsURL(file, callback) {
        const reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }


    onImageSelect() {
        console.log("IMAGE SELECTED!");
        let file = this.refs.pic.files[0];
        this.encodeImageFileAsURL(file, (x) => {
            this.setState({pic: x});
        });
    }

    render() {
        return (
            <div className={"profile"}>
                <h1>Edit your profile</h1>
                <div className={"profile-form"}>
                    <img className={"profile-pic"} src={this.state.pic} alt={"profile-pic"}/>
                    <label className={"profile-pic-label"}>Change<input type={"file"} ref="pic"
                                                                        onChange={this.onImageSelect}
                                                                        className={"profile-pic-input"}/></label>
                    <label>Info:<input className={"profile-info"} type={"text"} onChange={this.onInfoChange}
                                       value={this.state.userInfo}/></label>
                    <button onClick={() => this.props.onInfoSave(this.state.pic, this.props.info)}>Save</button>
                </div>

            </div>
        );
    }
}

export default EditProfile;
