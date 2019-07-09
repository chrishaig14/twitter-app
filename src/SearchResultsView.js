import React from "react";
// import FollowedUser from "./FollowedUser";

import {parse} from "query-string";
import UserCard from "./UserCard";

class SearchResultsView extends React.Component {
    serverUrl = "http://localhost:8888";
    term = "";

    constructor(props) {
        super(props);
        this.state = {users: [], searching: false};
    }


    search() {
        console.log("NEW SEARCH WITH: ", this.props.location.search);
        let x = parse(this.props.location.search);
        console.log("x: ", x);
        this.term = x.term;
        let url = this.serverUrl + "/search" + this.props.location.search;
        console.log("SEARCH URL: ", url);
        fetch(url, {method: "GET"}).then(
            res => {
                console.log("PEPEP: ", res);
                return res.json();
            }
        ).then(res => {
            console.log("SEARCH RESULT: ", res);
            this.setState({users: res.map(a => a.username)});
        });
        console.log(x);

    }

    componentDidMount() {

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
                {this.state.users.length} results for "{this.term}"
                <div className={"search-results"}>
                    {this.state.users.map(username => <UserCard key={username} onUnfollow={this.onUnfollow}
                                                                username={username}/>)}
                </div>
            </div>
        );
    }
}

export default SearchResultsView;