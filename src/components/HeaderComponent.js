import React from "react";
import SearchBox from "./SearchBox";
import {Link, NavLink, Redirect} from "react-router-dom";

class HeaderComponent extends React.Component {

    render() {
        return (
            <div className={"header"}>
                <NavLink to={"/feed"}>Home</NavLink>
                {/*// <Link to={{pathname: "feed", query: {'newState': 'something'}}}/>*/}
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