import React from "react";
import UserCardContainer from "../containers/UserCardContainer";

class FollowingViewComponent extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
            <div>
                <h2>Following {this.props.users.length} users</h2>
                <div className={"following-view"}>
                    {this.props.users.map(username => <UserCardContainer key={username} username={username}/>)}
                </div>
            </div>
        );
    }
}

export default FollowingViewComponent;