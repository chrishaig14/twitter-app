import React from "react";
import FollowedUser from "./FollowedUser";

import {parse} from "query-string";

class SearchResultsView extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.state = {users: ["user1", "user2", "user3"], searching: false};
    }

    search() {
        console.log("NEW SEARCH WITH: ", this.props.location.search);
        let x = parse(this.props.location.search);
        console.log(x);
        this.setState(prevState => (prevState.users.push(x.term)));
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
                {this.state.users.map(user => <div key={user}>{user}</div>)}
            </div>
        );
    }
}

export default SearchResultsView;