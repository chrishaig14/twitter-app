import React from "react";
import SearchBox from "./SearchBox";
import {NavLink} from "react-router-dom";

class HeaderComponent extends React.Component {

    render() {
        return (
            <div className={"header"}>
                <NavLink to={"/feed"}>Home</NavLink>
                <NavLink to={"/following"}>Following</NavLink>
                <SearchBox/>
                <div className={"current-user-info"}>
                    <NavLink to={{pathname: "/editProfile"}}
                             className={"current-username"}>{this.props.username}</NavLink>

                </div>
                <button onClick={this.props.onLogout} className={"logout-btn"}>Logout</button>
            </div>
        );
    }
}

export default HeaderComponent;
