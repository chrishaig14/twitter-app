import React from "react";
import SearchBox from "./SearchBox";
import {NavLink} from "react-router-dom";
import UserPicContainer from "../containers/UserPicContainer";

class HeaderComponent extends React.Component {

    render() {
        return (
            <div className={"header"}>
                <NavLink to={"/feed"}>Home</NavLink>
                <NavLink to={"/following"}>Following</NavLink>
                <SearchBox/>
                <div className={"current-user-info"}>
                    <UserPicContainer username={this.props.username}/>
                    <NavLink to={{pathname: "/editProfile"}}
                             className={"current-username"}>{this.props.username}</NavLink>
                </div>
                <button onClick={this.props.onLogout} className={"logout-btn"}>Logout</button>
            </div>
        );
    }
}

export default HeaderComponent;
