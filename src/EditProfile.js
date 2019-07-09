import React from "react";

class EditProfile extends React.Component {
    serverUrl = "http://localhost:8888";

    str_obj(str) {
        str = str.split("; ");
        const result = {};
        for (let i = 0; i < str.length; i++) {
            const cur = str[i].split("=");
            result[cur[0]] = cur[1];
        }
        return result;
    }


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

    componentDidMount() {
        fetch(this.serverUrl + "/users/me", {
            method: "GET",
            headers: {"Authorization": this.token}
        }).then(
            res => {
                if (res.ok) {
                    return res.json();
                }
            }
        ).then(
            res => {
                this.setState({pic: res.pic, info: res.info});
            }
        );
    }

    encodeImageFileAsURL(file, callback) {
        const reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

    updateImage(result) {
        fetch(this.serverUrl + "/users/me/img", {
            method: "PUT",
            headers: {
                "Authorization": this.token
            },
            body: result
        }).then(
            res => {
                if (res.ok) {
                    this.setState({pic: result}, () => {
                        console.log("new state: ", this.state.pic.slice(30, 50));
                    });
                } else {
                    console.log("COULD NOT UPDATE IMAGE!");
                }
            }
        );
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
                {/*<Header/>*/}
                {/*<div >*/}
                {/*<form className={"profile-form"} onSubmit={this.profileSubmit}>*/}

                {/*<div className={"profile-pic"}></div>*/}
                <h1>Edit your profile</h1>
                <div className={"profile-form"}>
                    <img className={"profile-pic"} src={this.state.pic}/>
                    <label className={"profile-pic-label"}>Change<input type={"file"} ref="pic"
                                                                        onChange={this.onImageSelect}
                                                                        className={"profile-pic-input"}/></label>
                    <label>Info:<input className={"profile-info"} type={"text"}/></label>
                    <button onClick={this.onInfoSave}>Save</button>
                </div>
                {/*</form>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default EditProfile;