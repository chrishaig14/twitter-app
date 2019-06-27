import React from "react";
import SearchBox from "./SearchBox";
import {Redirect} from "react-router-dom";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {toHome: false};
        this.logout = this.logout.bind(this);
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
                <SearchBox/>
                <button onClick={this.logout} className={"logout-btn"}>Logout</button>
            </div>
        );
    }
}

export default Header;