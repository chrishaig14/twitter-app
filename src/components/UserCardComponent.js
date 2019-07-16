import React from "react";
import {NavLink} from "react-router-dom";

class UserCardComponent extends React.Component {
    componentDidMount() {
        this.props.onMount(this.props.username);
    }

    render() {
        return (
            <div className={"followed-user"}>
                {/*<img className={"followed-user-pic"} src={this.state.pic}/>*/}
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