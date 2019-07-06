import React from "react";

class UserPic extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {userpic: ""};
    }


    componentDidMount() {
        let url = this.serverUrl + "/users/" + this.props.username + "/img";
        console.log("USER IMAGE URL:", url);
        let start = new Date();
        fetch(url, {
            method: "GET"
        }).then(
            res => {
                console.log("HERE");
                return res.text();
            }
        ).then(
            res => {
                let end = new Date();
                console.log("TOOK ", end - start);
                console.log(`GOT USER ${this.props.username} POSTS:`, res);
                this.setState({"userpic": res});
            }
        );
    }

    render() {
        return (
            <img src={this.state.userpic}/>
        );
    }
}

export default UserPic;