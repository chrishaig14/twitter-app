import React from "react";

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.profileSubmit = this.profileSubmit.bind(this);
        this.onImageSelect = this.onImageSelect.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.token = this.str_obj(document.cookie).token;
        this.state = {
            pic: ""
        };
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
        this.encodeImageFileAsURL(file, this.updateImage);
        console.log(this.refs.pic.files[0]);
    }

    profileSubmit(event) {
        console.log("SAVING USER PROFILE!");
        event.preventDefault();
    }

    render() {
        return (
            <div className={"profile"}>

                <h1>Edit your profile</h1>
                <div className={"profile-form"}>
                    <img className={"profile-pic"} src={this.state.pic}/>
                    <label className={"profile-pic-label"}>Change<input type={"file"} ref="pic"
                                                                        onChange={this.onImageSelect}
                                                                        className={"profile-pic-input"}/></label>
                    <label>Info:<input className={"profile-info"} type={"text"}/></label>
                    <button onClick={this.onInfoSave}>Save</button>
                </div>

            </div>
        );
    }
}

export default EditProfile;