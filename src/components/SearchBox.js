import React from "react";
import {Redirect} from "react-router-dom";

class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.state = {searchTerm: "", toResult: false};
        this.onInputChange = this.onInputChange.bind(this);
    }

    onSearch(event) {
        this.setState({toResult: true});
        event.preventDefault();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.toResult) this.setState({toResult: false});
    }

    onInputChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {

        return (
            <div className={"search-box"}>
                {this.state.toResult ? (<Redirect to={"/search?term=" + this.state.searchTerm}/>) : null}
                <form onSubmit={this.onSearch}>
                    <input type={"text"} onChange={this.onInputChange}/>
                    <button className={"submit-search-btn"} type={"submit"}>Search</button>
                </form>
            </div>
        );
    }
}

export default SearchBox;
