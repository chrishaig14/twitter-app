import React from "react";
import SearchBox from "./SearchBox";
import {NavLink, Redirect} from "react-router-dom";

class HeaderComponent extends React.Component {
    // componentDidMount() {
    //     fetch(this.serverUrl + "/users/me", {
    //         method: "GET",
    //         headers: {
    //             "Authorization": this.token
    //         }
    //     }).then(
    //         res => res.json()
    //     ).then(
    //         res => {
    //             this.setState({username: res.username, pic: res.pic});
    //             console.log("HHHEADER TOKKKEN: ", this.token);
    //             console.log("header received current user data: ", res);
    //         }
    //     );
    // }
    //
    // logout() {
    //     console.log("Logging out!");
    //     this.setState({toHome: true});
    //     document.cookie = "token=;path=/";
    // }

    render() {
        // if (this.state.toHome) {
        //     return (<Redirect to={"/"}/>);
        // }
        return (
            <div className={"header"}>
                <NavLink to={"/feed"}>Home</NavLink>
                <NavLink to={"/following"}>Following</NavLink>
                <SearchBox/>
                <div className={"current-user-info"}>
                    {/*<img*/}
                    {/*    src={this.state.pic} className={"current-user-pic"}>*/}

                    {/*</img>*/}
                    <NavLink to={{pathname: "/editProfile"}}
                             className={"current-username"}>{this.props.username}</NavLink>

                </div>
                <button onClick={this.props.onLogout} className={"logout-btn"}>Logout</button>
            </div>
        );
    }
}

export default HeaderComponent;