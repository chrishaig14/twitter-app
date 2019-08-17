import React from "react";
import {NavLink} from "react-router-dom";
import UserPicContainer from "../containers/UserPicContainer";

class UserCardComponent extends React.Component {
    componentDidMount() {
        this.props.onMount(this.props.username);
    }

    render() {
        return (
            <div className={"followed-user"}>
                <UserPicContainer username={this.props.username}/>
                <NavLink to={"/users/" + this.props.username}>{this.props.username}</NavLink>
                {this.props.followed ?
                    (<button onClick={() => this.props.unfollow(this.props.username)}>Unfollow</button>) :
                    (<button onClick={() => this.props.follow(this.props.username)}>Follow</button>)
                }
            </div>

        );
    }
}

export default UserCardComponent;
