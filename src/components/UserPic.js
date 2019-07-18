import React from "react";

class UserPic extends React.Component {
    render() {
        return (
            <img src={this.props.pic} className={"userpic"}/>
        );
    }
}

export default UserPic;