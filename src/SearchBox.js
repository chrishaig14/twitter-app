import React from "react";

class SearchBox extends React.Component {
    serverUrl = "http://localhost:8888";

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.state = {searchTerm: ""};
        this.onInputChange = this.onInputChange.bind(this);
    }

    onSearch(event) {
        console.log("SUBMITTING SEARCGH");
        fetch(this.serverUrl + "/search", {
            method: "POST",
            body: JSON.stringify({search_term: this.state.searchTerm})
        }).then(
            res => {
                // console.log("RESULT::: ", res);
                return res.json();
            }
        ).then(
            res => {
                console.log("SEARCH RESULT: ", res);
            }
        );
        event.preventDefault();
    }

    onInputChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (
            <div className={"search-box"}>
                <form onSubmit={this.onSearch}>
                    <input type={"text"} onChange={this.onInputChange}/>
                    <button className={"submit-search-btn"} type={"submit"}>Search</button>
                </form>
            </div>
        );
    }
}

export default SearchBox;