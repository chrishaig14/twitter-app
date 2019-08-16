import React from "react";

class UserPicComponent extends React.Component {
    componentDidMount() {
        this.props.onMount(this.props.username);
    }


    render() {
        return (
            <img src={this.props.img} className={"userpic"} alt={"userpic"}/>
        );
    }
}

export default UserPicComponent;
