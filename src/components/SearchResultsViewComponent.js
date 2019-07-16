import React from "react";
// import FollowedUser from "./FollowedUser";

import {parse} from "query-string/index";
import UserCard from "./UserCard";

class SearchResultsViewComponent extends React.Component {
    componentDidMount() {
        this.props.search(this.props.location.search);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.search !== this.props.location.search) {
            this.props.search(this.props.location.search);
        }
    }

    render() {
        return (
            <div>
                {this.props.users.length} results for "{this.props.location.search}"
                <div className={"search-results"}>
                    {this.props.users.map(username => <UserCard key={username} onUnfollow={this.onUnfollow}
                                                                username={username}/>)}
                </div>
            </div>
        );
    }
}

export default SearchResultsViewComponent;