import React from "react";
import SearchBox from "./SearchBox";
import {NavLink, Redirect} from "react-router-dom";

class Header extends React.Component {

    serverUrl = "http://localhost:8888";

    // username = "";

    str_obj(str) {
        str = str.split("; ");
        var result = {};
        for (var i = 0; i < str.length; i++) {
            var cur = str[i].split("=");
            result[cur[0]] = cur[1];
        }
        return result;
    }

    constructor(props) {
        super(props);
        this.state = {toHome: false, username: ""};
        this.logout = this.logout.bind(this);
        this.token = this.str_obj(document.cookie).token;
    }

    componentDidMount() {
        fetch(this.serverUrl + "/users/me", {
            method: "GET",
            headers: {
                "Authorization": this.token
            }
        }).then(
            res => res.json()
        ).then(
            res => {
                this.setState({username: res.username});
                console.log("HHHEADER TOKKKEN: ", this.token);
                console.log("header received current user data: ", res);
            }
        );
    }

    logout() {
        console.log("Logging out!");
        this.setState({toHome: true});
        document.cookie = "token=;path=/";
    }

    render() {
        if (this.state.toHome) {
            return (<Redirect to={"/"}/>);
        }
        return (
            <div className={"header"}>
                <NavLink to={"/"}>Home</NavLink>
                <SearchBox/>
                <div className={"current-user-info"}>
                    <div className={"current-user-pic"}>

                    </div>
                    <NavLink to={{pathname: "/editProfile"}} className={"current-username"}>{this.state.username}</NavLink>

                </div>
                <button onClick={this.logout} className={"logout-btn"}>Logout</button>
            </div>
        );
    }
}

export default Header;