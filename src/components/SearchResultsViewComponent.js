import React from "react";
import UserCardContainer from "../containers/UserCardContainer";

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
                    {this.props.users.map(username => <UserCardContainer key={username} username={username}/>)}
                </div>
            </div>
        );
    }
}

export default SearchResultsViewComponent;