import React from "react";
// import FollowedUser from "./FollowedUser";

import {parse} from "query-string";
import UserCard from "./UserCard";

class SearchResultsView extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {users: [], searching: false};
    }



    search() {
        console.log("NEW SEARCH WITH: ", this.props.location.search);
        let x = parse(this.props.location.search);
        console.log(x);
        this.setState(prevState => (prevState.users=[x.term]));

    }

    componentDidMount() {
        // console.log("component mounted");
        this.search();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.search();
        }
    }


    render() {
        return (
            <div>
                Results for: {this.props.location.search}
                {/*{this.state.users.map(user => <div key={user}>{user}</div>)}*/}
                {this.state.users.map(username => <UserCard key={username} onUnfollow={this.onUnfollow}
                                                                username={username}/>)}
            </div>
        );
    }
}

export default SearchResultsView;